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
    private productTypesRepository: ProductTypesRepository,
  ) {}

  async execute({
    type,
  }: CreateProductTypeRequestBodyDTO): Promise<ProductType> {
    const savedType = await this.productTypesRepository.findProductTypeByName(
      type,
    );

    if (savedType) {
      throw new ConflictException(alreadyExists('Product-type'));
    }

    const newType = await this.productTypesRepository.createProductType({
      type,
    });
    return newType;
  }
}
