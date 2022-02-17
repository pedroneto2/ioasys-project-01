import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { ProductTypesRepository } from '@modules/productTypes/repository/productTypes.repository';
import { ProductType } from '@shared/entities/productType/productType.entity';

@Injectable()
export class DeleteProductTypeUseCase {
  constructor(
    @InjectRepository(ProductTypesRepository)
    private productTypesRepository: ProductTypesRepository,
  ) {}

  async execute(name: string): Promise<ProductType> {
    return await this.productTypesRepository.deleteProductType(name);
  }
}
