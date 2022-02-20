import { EntityRepository, Repository } from 'typeorm';
import { ConflictException } from '@nestjs/common';

import { CreateOrderDTO } from '@shared/dtos/order/createOrder.dto';
import { unexpected } from '@shared/constants/errors';

import { Order } from '@shared/entities/order/order.entity';

import { OrderStatus } from '@shared/entities/order/orderStatus.enum';

@EntityRepository(Order)
export class OrderRepository extends Repository<Order> {
  async findOrderByUserId(userID: string): Promise<Order | undefined> {
    try {
      return await this.findOne({
        select: ['id'],
        where: { userID },
      });
    } catch (error) {
      throw new ConflictException(unexpected(error.message));
    }
  }

  async findOrderInProgress(userID: string): Promise<Order | undefined> {
    try {
      return await this.findOne({
        select: ['id'],
        where: {
          userID,
          status: OrderStatus.REQUEST_IN_PROGRESS,
        },
      });
    } catch (error) {
      throw new ConflictException(unexpected(error.message));
    }
  }

  async createOrder(createOrderDTO: CreateOrderDTO): Promise<Order> {
    try {
      const order = this.create(createOrderDTO);
      return await this.save(order);
    } catch (error) {
      throw new ConflictException(unexpected(error.message));
    }
  }

  async getUserOrdersInfo(userID: string): Promise<Order[]> {
    try {
      const orders = await this.createQueryBuilder('orders')
        .where('user.id = :userID', { userID })
        .leftJoin('orders.userID', 'user')
        .select([
          'orders.id',
          'orders.status',
          'user.address',
          'user.zipCode',
          'user.state',
        ])
        .getMany();
      return orders;
    } catch (error) {
      throw new ConflictException(unexpected(error.message));
    }
  }

  async checkOutOrder(userID: string): Promise<Order> {
    try {
      const order = await this.createQueryBuilder('orders')
        .update(Order)
        .set({ status: OrderStatus.REQUEST_DONE })
        .where('status = :status', { status: OrderStatus.REQUEST_IN_PROGRESS })
        .andWhere('userID = :userID', { userID })
        .returning('*')
        .updateEntity(true)
        .execute();
      return order.raw[0];
    } catch (error) {
      throw new ConflictException(unexpected(error.message));
    }
  }
}
