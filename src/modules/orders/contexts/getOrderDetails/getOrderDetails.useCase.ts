import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { OrderRepository } from '@modules/orders/repositories/order.repository';
import { OrderProductRepository } from '@modules/orders/repositories/orderProduct.repository';

import { Order } from '@shared/entities/order/order.entity';

import { StructuredOrderInfoDTO } from '@shared/dtos/order/structuredOrderInfo.dto';
import { StructuredOrderProductDTO } from '@shared/dtos/orderProduct/structuredOrderProduct.dto';
import { notFound, unexpected } from '@shared/constants/errors';

@Injectable()
export class GetOrderDetailsUseCase {
  constructor(
    @InjectRepository(OrderRepository)
    private readonly orderRepository: OrderRepository,
    private readonly orderProductRepository: OrderProductRepository,
  ) {}

  async getUserOrdersInfo(userID: string): Promise<StructuredOrderInfoDTO[]> {
    const ordersInfo = await this.orderRepository.getUserOrdersInfo(userID);
    return this.structuredOrderInfo(ordersInfo);
  }

  async getUserOrderPricesInProgress(
    userID: string,
  ): Promise<StructuredOrderProductDTO> {
    const orderProducts =
      await this.orderProductRepository.getUserOrderDetailsInProgress(userID);
    return this.structureOrderProduct(orderProducts);
  }

  async getUserOrdersDetailsById(
    userID: string,
    orderID: string,
  ): Promise<StructuredOrderProductDTO> {
    const orderProduct =
      await this.orderProductRepository.getUserOrdersDetailsById(
        userID,
        orderID,
      );
    const orderProductArray = orderProduct ? [orderProduct] : [];
    return this.structureOrderProduct(orderProductArray);
  }

  async checkOutOrder(userID: string): Promise<Order> {
    const order = await this.orderRepository.checkOutOrder(userID);
    if (!order) {
      throw new ConflictException(notFound('Order-in-progress'));
    }
    return order;
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
        const productPrices = {
          name: product.productID.name,
          type: product.productID.type,
          size: product.productID.size,
          description: product.productID.description,
          price: product.productID.price,
          quantity: product.quantity,
          subTotal: subTotal,
        };
        structuredOrderProducts.products.push(productPrices);
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

  private structuredOrderInfo(ordersInfo): StructuredOrderInfoDTO[] {
    return ordersInfo.map((order) => {
      const orderInfo = {
        id: order.id,
        status: order.status,
        address: order.userID.address,
        state: order.userID.state,
        zipCode: order.userID.zipCode,
      };
      return orderInfo;
    });
  }
}
