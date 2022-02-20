import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

import { OrderRepository } from '@modules/orders/repositories/order.repository';
import { OrderProductRepository } from '@modules/orders/repositories/orderProduct.repository';
import { ProductRepository } from '@modules/products/repository/product.repository';

import { HandleProductToOrderUseCase } from '@modules/orders/contexts/handleProductOrder/handleProductOrder.useCase';

import { HandleProductToOrderController } from '@modules/orders/contexts/handleProductOrder/handleProductToOrder.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      OrderRepository,
      OrderProductRepository,
      ProductRepository,
    ]),
  ],
  providers: [HandleProductToOrderUseCase],
  controllers: [HandleProductToOrderController],
})
export class OrderModule {}
