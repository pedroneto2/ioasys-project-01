import { Injectable, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { notFound } from '@shared/constants/errors';
import { ProductTypesRepository } from '@modules/productTypes/repository/productTypes.repository';
import { ProductType } from '@shared/entities/productType/productType.entity';

@Injectable()
export class DeleteProductTypeUseCase {
  constructor(
    @InjectRepository(ProductTypesRepository)
    private readonly productTypesRepository: ProductTypesRepository,
  ) {}

  async execute(name: string): Promise<ProductType> {
    const response = await this.productTypesRepository.deleteProductType(name);

    if (!response) {
      throw new ConflictException(notFound('Product-type'));
    }

    return response;
  }
}
