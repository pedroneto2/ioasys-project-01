import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

import { OrderRepository } from '@modules/orders/repositories/order.repository';
import { OrderProductRepository } from '@modules/orders/repositories/orderProduct.repository';
import { ProductRepository } from '@modules/products/repository/product.repository';
import { AddressRepository } from '@modules/address/repository/address.repository';
import { UserRepository } from '@modules/users/repository/user.repository';
import { ProductStampRepository } from '@modules/orders/repositories/productStamp.repository';

import { HandleProductToOrderUseCase } from '@modules/orders/contexts/handleProductOrder/handleProductOrder.useCase';
import { GetOrderDetailsUseCase } from '@modules/orders/contexts/getOrderDetails/getOrderDetails.useCase';
import { CheckOutOrderUseCase } from '@modules/orders/contexts/checkOutOrder/checkOutOrder.useCase';

import { CheckOutOrderController } from '@modules/orders/contexts/checkOutOrder/checkOutOrder.controller';
import { HandleProductToOrderController } from '@modules/orders/contexts/handleProductOrder/handleProductToOrder.controller';
import { GetOrderDetailsController } from '@modules/orders/contexts/getOrderDetails/getOrderDetails.controller';

import { CryptoProvider } from '@shared/providers/EncryptProvider/crypto.provider';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      OrderRepository,
      OrderProductRepository,
      ProductRepository,
      AddressRepository,
      UserRepository,
      ProductStampRepository,
    ]),
    CryptoProvider,
  ],
  providers: [
    { provide: 'CRYPTO_PROVIDER', useClass: CryptoProvider },
    HandleProductToOrderUseCase,
    GetOrderDetailsUseCase,
    CheckOutOrderUseCase,
  ],
  controllers: [
    HandleProductToOrderController,
    GetOrderDetailsController,
    CheckOutOrderController,
  ],
})
export class OrderModule {}
