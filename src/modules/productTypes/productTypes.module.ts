import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ProductTypesRepository } from '@modules/productTypes/repository/productTypes.repository';
import { CreateProductTypeUseCase } from '@modules/productTypes/contexts/createProductType/createProductType.useCase';
import { CreateProductTypeController } from '@modules/productTypes/contexts/createProductType/createProductType.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ProductTypesRepository])],
  providers: [CreateProductTypeUseCase],
  controllers: [CreateProductTypeController],
})
export class ProductTypesModule {}
