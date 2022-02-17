import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ProductRepository } from '@modules/products/repository/product.repository';
import { CreateProductUseCase } from '@modules/products/contexts/createProduct/createProduct.useCase';
import { DeleteProductUseCase } from '@modules/products/contexts/deleteProduct/deleteProduct.useCase';
import { FindProductUseCase } from '@modules/products/contexts/findProduct/findProduct.useCase';

import { CreateProductController } from '@modules/products/contexts/createProduct/createProduct.controller';
import { DeleteProductController } from '@modules/products/contexts/deleteProduct/deleteProduct.controller';
import { FindProductController } from '@modules/products/contexts/findProduct/findProduct.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ProductRepository])],
  providers: [CreateProductUseCase, DeleteProductUseCase, FindProductUseCase],
  controllers: [
    CreateProductController,
    DeleteProductController,
    FindProductController,
  ],
})
export class ProductModule {}
