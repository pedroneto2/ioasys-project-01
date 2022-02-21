import { Module } from '@nestjs/common';
import envConfig from '@config/env';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthenticationModule } from '@shared/modules/authentication/authentication.module';
import { AuthorizationModule } from '@shared/modules/authorization/authorization.module';

import { UserModule } from '@modules/users/user.module';
import { ProductTypeModule } from '@modules/productTypes/productType.module';
import { ProductModule } from '@modules/products/product.module';
import { OrderModule } from '@modules/orders/order.module';
import { AdminModule } from '@modules/admin/admin.module';

import {
  WinstonModule,
  utilities as nestWinstonModuleUtilities,
} from 'nest-winston';

import * as winston from 'winston';
@Module({
  imports: [
    ConfigModule.forRoot({
      load: [envConfig],
      isGlobal: true,
    }),
    WinstonModule.forRoot({
      transports: [
        new winston.transports.Console({
          format: winston.format.combine(
            winston.format.timestamp(),
            nestWinstonModuleUtilities.format.nestLike(),
          ),
        }),
      ],
    }),
    TypeOrmModule.forRoot(),
    AuthenticationModule,
    AuthorizationModule,
    UserModule,
    ProductTypeModule,
    ProductModule,
    OrderModule,
    AdminModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
