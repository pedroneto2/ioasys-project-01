import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ProductRepository } from '@modules/products/repository/product.repository';
import { CreateProductUseCase } from '@modules/products/contexts/createProduct/createProduct.useCase';
import { CreateProductController } from '@modules/products/contexts/createProduct/createProduct.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ProductRepository])],
  providers: [CreateProductUseCase],
  controllers: [CreateProductController],
})
export class ProductModule {}
