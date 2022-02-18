import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { alreadyExists } from '@shared/constants/errors';

import { CreateProductTypeRequestBodyDTO } from '@shared/dtos/productType/createProductTypeRequestBody.dto';
import { ProductType } from '@shared/entities/productType/productType.entity';
import { ProductTypesRepository } from '@modules/productTypes/repository/productTypes.repository';

@Injectable()
export class CreateProductTypeUseCase {
  constructor(
    @InjectRepository(ProductTypesRepository)
    private readonly productTypesRepository: ProductTypesRepository,
  ) {}

  async execute({
    name,
  }: CreateProductTypeRequestBodyDTO): Promise<ProductType> {
    const savedProductType =
      await this.productTypesRepository.findProductTypeByName(name);

    if (savedProductType) {
      throw new ConflictException(alreadyExists('Product-type'));
    }

    const newProductType = await this.productTypesRepository.createProductType({
      name,
    });
    return newProductType;
  }
}
