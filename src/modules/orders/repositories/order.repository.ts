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
}
