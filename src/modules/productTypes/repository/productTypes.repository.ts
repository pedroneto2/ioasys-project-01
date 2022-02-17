import { EntityRepository, Repository } from 'typeorm';
import { ConflictException } from '@nestjs/common';

import { CreateProductTypeDTO } from '@shared/dtos/productType/createProductType.dto';
import { ProductType } from '@shared/entities/productType/productType.entity';
import { unexpected } from '@shared/constants/errors';

@EntityRepository(ProductType)
export class ProductTypesRepository extends Repository<ProductType> {
  async findProductTypeByName(name: string): Promise<ProductType | undefined> {
    try {
      return await this.findOne({ name });
    } catch (error) {
      throw new ConflictException(unexpected(error.message));
    }
  }

  async getAllProductTypes(): Promise<ProductType[]> {
    try {
      return await this.find();
    } catch (error) {
      throw new ConflictException(unexpected(error.message));
    }
  }

  async deleteProductType(name: string): Promise<ProductType> {
    try {
      const response = await this.createQueryBuilder()
        .delete()
        .from(ProductType)
        .where('name = :name', { name })
        .returning(['name'])
        .execute();
      return response.raw[0];
    } catch (error) {
      throw new ConflictException(unexpected(error.message));
    }
  }

  async createProductType(
    createProductTypeDTO: CreateProductTypeDTO,
  ): Promise<ProductType> {
    try {
      const name = this.create(createProductTypeDTO);
      return await this.save(name);
    } catch (error) {
      throw new ConflictException(unexpected(error.message));
    }
  }
}
