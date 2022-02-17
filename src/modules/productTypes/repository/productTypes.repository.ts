import { EntityRepository, Repository } from 'typeorm';
import { ConflictException } from '@nestjs/common';

import { CreateProductTypeDTO } from '@shared/dtos/productType/createProductType.dto';
import { ProductType } from '@shared/entities/productType/productType.entity';
import { unexpected } from '@shared/constants/errors';

@EntityRepository(ProductType)
export class ProductTypesRepository extends Repository<ProductType> {
  async findProductTypeByName(type: string): Promise<ProductType | undefined> {
    try {
      return await this.findOne({ type });
    } catch (error) {
      throw new ConflictException(unexpected(error.message));
    }
  }

  async createProductType(
    createProductTypeDTO: CreateProductTypeDTO,
  ): Promise<ProductType> {
    try {
      const type = this.create(createProductTypeDTO);
      return await this.save(type);
    } catch (error) {
      throw new ConflictException(unexpected(error.message));
    }
  }
}
