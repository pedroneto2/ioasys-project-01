import { ConflictException, Injectable, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { CryptoProvider } from '@shared/providers/EncryptProvider/crypto.provider';

import { OrderRepository } from '@modules/orders/repositories/order.repository';
import { OrderProductRepository } from '@modules/orders/repositories/orderProduct.repository';
import { AddressRepository } from '@modules/address/repository/address.repository';
import { UserRepository } from '@modules/users/repository/user.repository';
import { ProductStampRepository } from '@modules/orders/repositories/productStamp.repository';

import { missingData, notFound, unexpected } from '@shared/constants/errors';

import { Address } from '@shared/entities/addressess/address.entity';
import { OrderProduct } from '@shared/entities/orderProduct/orderProduct.entity';
import { User } from '@shared/entities/user/user.entity';
import { Order } from '@shared/entities/order/order.entity';

import { v4 as uuidV4 } from 'uuid';

@Injectable()
export class CheckOutOrderUseCase {
  constructor(
    @InjectRepository(OrderRepository)
    private readonly orderRepository: OrderRepository,
    private readonly addressRepository: AddressRepository,
    private readonly userRepository: UserRepository,
    private readonly productStampRepository: ProductStampRepository,
    private readonly orderProductRepository: OrderProductRepository,
    @Inject('CRYPTO_PROVIDER')
    private readonly crypto: CryptoProvider,
  ) {}
  async checkOutOrder(userID: string, providedAddressID: string) {
    // USER INFORMATIONS (address, fullName, cpf) and PRODDUCTS INFORMATIONS retrieve
    const userCheckOutData = await this.userRepository.getCheckOutData(userID);
    const address = await this.retrieveUserAddress(
      userID,
      providedAddressID,
      userCheckOutData,
    );
    const orderDetails = await this.retrieveOrderDetails(userID);
    // Order update
    const order = await this.updateOrder(
      userCheckOutData,
      orderDetails,
      address,
      userID,
    );
    // Generate productsStamp Entity list
    const productsStampList = this.createProductsStampList(
      orderDetails,
      order.id,
    );
    // Save productsStamp
    const productsStamp = await this.productStampRepository.saveProductStamp(
      productsStampList,
    );
    // Decrypt order update response
    this.handleRawKeys(order, 'clientName', 'client_name');
    this.handleRawKeys(order, 'clientCPF', 'client_cpf');
    this.handleRawKeys(order, 'zipCode', 'zip_code');
    const decryptedOrder = this.crypto.decryptOrder(order);

    return { orderInfo: decryptedOrder, productsStamp };
  }

  // =========================================================================================
  // PRIVATE METHODS
  // =========================================================================================
  private handleRawKeys(object, newKey: string, oldKey: string) {
    Object.defineProperty(
      object,
      newKey,
      Object.getOwnPropertyDescriptor(object, oldKey),
    );
    delete object[oldKey];
  }

  private createProductsStampList(orderDetails, orderID: string) {
    try {
      const productStampList = [];
      orderDetails.forEach((orderDetail) => {
        const subTotal = orderDetail.quantity * orderDetail.productID.price;
        const productStamp = {
          id: uuidV4(),
          orderID: orderID,
          name: orderDetail.productID.name,
          type: orderDetail.productID.type.name,
          size: orderDetail.productID.size,
          description: orderDetail.productID.description,
          price: orderDetail.productID.price,
          quantity: orderDetail.quantity,
          subTotal: subTotal.toFixed(2),
        };
        const productStampEntity =
          this.productStampRepository.create(productStamp);
        productStampList.push(productStampEntity);
      });
      return productStampList;
    } catch (error) {
      throw new ConflictException(
        unexpected('createProductsStampList:checkOutOrderUseCase'),
      );
    }
  }

  private retrieveOrderTotalPrice(orderDetails): string {
    try {
      let price = 0;
      orderDetails.forEach((orderDetail) => {
        price += orderDetail.productID.price * orderDetail.quantity;
      });
      return price.toFixed(2);
    } catch (error) {
      throw new ConflictException(
        unexpected('createProductsStampList:checkOutOrderUseCase'),
      );
    }
  }

  private async retrieveUserAddress(
    userID: string,
    providedAddressID: string,
    userCheckOutData: User,
  ): Promise<Address> {
    const addressID = providedAddressID || userCheckOutData.defaultAddressID;
    const address = await this.addressRepository.getAddress(userID, addressID);
    if (!address) {
      throw new ConflictException(missingData('Address'));
    }
    return address;
  }

  private async retrieveOrderDetails(userID: string): Promise<OrderProduct[]> {
    const orderDetails =
      await this.orderProductRepository.getUserOrderDetailsInProgress(userID);
    if (!orderDetails) {
      throw new ConflictException(missingData('Products-to-order'));
    }
    return orderDetails;
  }

  private async updateOrder(
    userCheckOutData: User,
    orderDetails: OrderProduct[],
    address: Address,
    userID: string,
  ): Promise<Order> {
    const price = this.retrieveOrderTotalPrice(orderDetails);
    const order = await this.orderRepository.checkOutOrder(
      userID,
      userCheckOutData.fullName,
      userCheckOutData.cpf,
      this.crypto.encrypt(price),
      address.address,
      address.state,
      address.zipCode,
    );
    if (!order) {
      throw new ConflictException(notFound('Order-in-progress'));
    }
    return order;
  }
}
