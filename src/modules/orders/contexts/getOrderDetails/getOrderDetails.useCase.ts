import { ConflictException, Injectable, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { CryptoProvider } from '@shared/providers/EncryptProvider/crypto.provider';

import { OrderRepository } from '@modules/orders/repositories/order.repository';
import { OrderProductRepository } from '@modules/orders/repositories/orderProduct.repository';
import { ProductStampRepository } from '@modules/orders/repositories/productStamp.repository';

import { Order } from '@shared/entities/order/order.entity';
import { ProductStamp } from '@shared/entities/productStamp/productStamp.entity';

import { StructuredOrderProductDTO } from '@shared/dtos/orderProduct/structuredOrderProduct.dto';
import { structuredOrderProductStampDTO } from '@shared/dtos/order/structuredOrderProductsStamp.dto';

import { unexpected } from '@shared/constants/errors';

@Injectable()
export class GetOrderDetailsUseCase {
  constructor(
    @InjectRepository(OrderRepository)
    private readonly orderRepository: OrderRepository,
    private readonly orderProductRepository: OrderProductRepository,
    private readonly productStampRepository: ProductStampRepository,
    @Inject('CRYPTO_PROVIDER')
    private readonly crypto: CryptoProvider,
  ) {}

  async getUserOrdersInfo(userID: string): Promise<Order[]> {
    const ordersInfo = await this.orderRepository.getUserOrdersInfo(userID);
    return this.structuredOrderInfo(ordersInfo);
  }

  async getUserOrderDetailsInProgress(
    userID: string,
  ): Promise<StructuredOrderProductDTO> {
    const orderProducts =
      await this.orderProductRepository.getUserOrderDetailsInProgress(userID);
    return this.structureOrderProduct(orderProducts);
  }

  async getOrderProductsStamp(
    userID: string,
    orderID: string,
  ): Promise<structuredOrderProductStampDTO> {
    const productsStamp =
      await this.productStampRepository.retrieveProductStampsFromOrder(
        userID,
        orderID,
      );
    return this.structureOrderProductsStamp(productsStamp);
  }

  // =========================================================================================
  // PRIVATE METHODS
  // =========================================================================================
  //dúvida: como tipar orderProducts para aceitar os valores do leftJoin?
  private structureOrderProduct(orderProducts): StructuredOrderProductDTO {
    try {
      const structuredOrderProducts = {
        products: [],
        total: 0,
      };
      orderProducts.forEach((product) => {
        const subTotal = product.productID.price * product.quantity;
        const productDetails = {
          name: product.productID.name,
          type: product.productID.type.name,
          size: product.productID.size,
          description: product.productID.description,
          price: product.productID.price,
          quantity: product.quantity,
          subTotal: +subTotal.toFixed(2),
        };
        structuredOrderProducts.products.push(productDetails);
        structuredOrderProducts.total += subTotal;
      });
      structuredOrderProducts.total = +structuredOrderProducts.total.toFixed(2);
      return structuredOrderProducts;
    } catch (error) {
      throw new ConflictException(
        unexpected('structureOrderProduct:getOrderDetails'),
      );
    }
  }

  private structuredOrderInfo(ordersInfo: Order[]): Order[] {
    return ordersInfo.map((order: Order) => {
      const orderInfo = { ...order };
      return this.crypto.decryptOrder(orderInfo);
    });
  }

  private structureOrderProductsStamp(
    productsStamp: ProductStamp[],
  ): structuredOrderProductStampDTO {
    const response = { products: productsStamp, total: '0' };
    let total = 0;
    productsStamp.forEach((productStamp) => {
      total += +productStamp.subTotal;
    });
    response.total = total.toFixed(2);
    return response;
  }
}
