import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { notFound } from '@shared/constants/errors';

import { ProductType } from '@shared/entities/productType/productType.entity';
import { ProductTypesRepository } from '@modules/productTypes/repository/productTypes.repository';

@Injectable()
export class FindProductTypeUseCase {
  constructor(
    @InjectRepository(ProductTypesRepository)
    private readonly productTypesRepository: ProductTypesRepository,
  ) {}

  async findProductTypeByName(name: string): Promise<ProductType> {
    const savedProductType =
      await this.productTypesRepository.findProductTypeByName(name);

    if (!savedProductType) {
      throw new ConflictException(notFound('Product-type'));
    }

    return savedProductType;
  }

  async getAllProductTypes(): Promise<ProductType[]> {
    return await this.productTypesRepository.getAllProductTypes();
  }
}
