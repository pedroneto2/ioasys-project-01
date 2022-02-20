import { EntityRepository, Repository } from 'typeorm';
import { ConflictException } from '@nestjs/common';

import { CreateOrderProductDTO } from '@shared/dtos/orderProduct/createOrderProduct.dto';
import { unexpected } from '@shared/constants/errors';

import { OrderProduct } from '@shared/entities/orderProduct/orderProduct.entity';

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

  //   async updateOrderProductQuantity(
  //     quantity: number,
  //     productID: string,
  //     orderID: string,
  //   ): Promise<OrderProduct> {
  //     try {
  //       const response = await this.createQueryBuilder('orders_products')
  //         .update<OrderProduct>(OrderProduct, { quantity })
  //         .where('productID = :productID', { productID })
  //         .andWhere('orderID = :orderID', { orderID })
  //         .returning(['quantity'])
  //         .updateEntity(true)
  //         .execute();
  //       return response.raw[0];
  //     } catch (error) {
  //       throw new ConflictException(unexpected(error.message));
  //     }
  //   }
}
