import { EntityRepository, Repository } from 'typeorm';
import { ConflictException } from '@nestjs/common';

import { unexpected } from '@shared/constants/errors';

import { ProductStamp } from '@shared/entities/productStamp/productStamp.entity';

@EntityRepository(ProductStamp)
export class ProductStampRepository extends Repository<ProductStamp> {
  async saveProductStamp(
    productStampList: ProductStamp[],
  ): Promise<ProductStamp[]> {
    try {
      return await this.save(productStampList);
    } catch (error) {
      throw new ConflictException(unexpected(error.message));
    }
  }

  async retrieveProductStampsFromOrder(
    userID: string,
    orderID: string,
  ): Promise<ProductStamp[]> {
    try {
      return await this.createQueryBuilder('products_stamp')
        .leftJoin('products_stamp.orderID', 'order')
        .where('products_stamp.orderID = :orderID', { orderID })
        .andWhere('order.userID = :userID', { userID })
        .select([
          'products_stamp.name',
          'products_stamp.type',
          'products_stamp.size',
          'products_stamp.description',
          'products_stamp.price',
          'products_stamp.quantity',
          'products_stamp.subTotal',
        ])
        .getMany();
    } catch (error) {
      throw new ConflictException(unexpected(error.message));
    }
  }
}
