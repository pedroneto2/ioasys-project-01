import { EntityRepository, Repository } from 'typeorm';
import { ConflictException } from '@nestjs/common';

import { CreateOrderProductDTO } from '@shared/dtos/orderProduct/createOrderProduct.dto';
import { unexpected } from '@shared/constants/errors';

import { OrderProduct } from '@shared/entities/orderProduct/orderProduct.entity';
import { OrderStatus } from '@shared/entities/order/orderStatus.enum';

@EntityRepository(OrderProduct)
export class OrderProductRepository extends Repository<OrderProduct> {
  async findOrderProductByOrderIdAndProductId(
    orderID: string,
    productID: string,
  ): Promise<OrderProduct | undefined> {
    try {
      return await this.findOne({
        select: ['id', 'quantity'],
        where: { orderID, productID },
      });
    } catch (error) {
      throw new ConflictException(unexpected(error.message));
    }
  }

  async createOrUpdateOrderProduct(
    createOrderProductDTO: CreateOrderProductDTO,
  ): Promise<OrderProduct> {
    try {
      return await this.save(createOrderProductDTO);
    } catch (error) {
      throw new ConflictException(unexpected(error.message));
    }
  }

  async deleteOrderProductByOrderIdAndProductId(
    orderID: string,
    productID: string,
  ): Promise<OrderProduct> {
    try {
      const response = await this.createQueryBuilder()
        .delete()
        .from(OrderProduct)
        .where('orderID = :orderID', { orderID })
        .andWhere('productID = :productID', { productID })
        .returning('*')
        .execute();
      return response.raw[0];
    } catch (error) {
      throw new ConflictException(unexpected(error.message));
    }
  }

  async getUserOrderDetailsInProgress(userID: string): Promise<OrderProduct[]> {
    try {
      const orderPrices = await this.createQueryBuilder('orders_products')
        .leftJoin('orders_products.orderID', 'order')
        .leftJoin('orders_products.productID', 'product')
        .leftJoin('product.type', 'type')
        .where('order.userID = :userID', { userID })
        .andWhere('order.status = :status', {
          status: OrderStatus.REQUEST_IN_PROGRESS,
        })
        .select([
          'orders_products.quantity',
          'product.price',
          'product.name',
          'type.name',
          'product.size',
          'product.description',
        ])
        .getMany();
      return orderPrices;
    } catch (error) {
      throw new ConflictException(unexpected(error.message));
    }
  }
}
