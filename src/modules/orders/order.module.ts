import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

import { OrderRepository } from '@modules/orders/repositories/order.repository';
import { OrderProductRepository } from '@modules/orders/repositories/orderProduct.repository';
import { ProductRepository } from '@modules/products/repository/product.repository';

import { HandleProductToOrderUseCase } from '@modules/orders/contexts/handleProductOrder/handleProductOrder.useCase';
import { GetOrderDetailsUseCase } from '@modules/orders/contexts/getOrderDetails/getOrderDetails.useCase';

import { HandleProductToOrderController } from '@modules/orders/contexts/handleProductOrder/handleProductToOrder.controller';
import { GetOrderDetailsController } from '@modules/orders/contexts/getOrderDetails/getOrderDetails.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      OrderRepository,
      OrderProductRepository,
      ProductRepository,
    ]),
  ],
  providers: [HandleProductToOrderUseCase, GetOrderDetailsUseCase],
  controllers: [HandleProductToOrderController, GetOrderDetailsController],
})
export class OrderModule {}
