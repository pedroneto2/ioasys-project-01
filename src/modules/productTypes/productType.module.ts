import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ProductTypesRepository } from '@modules/productTypes/repository/productTypes.repository';
import { CreateProductTypeUseCase } from '@modules/productTypes/contexts/createProductType/createProductType.useCase';
import { DeleteProductTypeUseCase } from '@modules/productTypes/contexts/deleteProductType/deleteProductType.useCase';
import { FindProductTypeUseCase } from '@modules/productTypes/contexts/findProductType/findProductType.useCase';

import { CreateProductTypeController } from '@modules/productTypes/contexts/createProductType/createProductType.controller';
import { DeleteProductTypeController } from '@modules/productTypes/contexts/deleteProductType/deleteProductType.controller';
import { FindProductTypeController } from '@modules/productTypes/contexts/findProductType/findProductType.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ProductTypesRepository])],
  providers: [
    CreateProductTypeUseCase,
    DeleteProductTypeUseCase,
    FindProductTypeUseCase,
  ],
  controllers: [
    CreateProductTypeController,
    DeleteProductTypeController,
    FindProductTypeController,
  ],
})
export class ProductTypeModule {}
