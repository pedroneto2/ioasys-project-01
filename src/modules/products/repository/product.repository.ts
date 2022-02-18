import { EntityRepository, Repository } from 'typeorm';
import { ConflictException } from '@nestjs/common';

import { CreateProductDTO } from '@shared/dtos/product/createProduct.dto';
import { Product } from '@shared/entities/product/product.entity';
import { unexpected } from '@shared/constants/errors';

@EntityRepository(Product)
export class ProductRepository extends Repository<Product> {
  async findProductByName(
    name: string,
    withDeleted = false,
  ): Promise<Product | undefined> {
    try {
      return await this.findOne({ name }, { withDeleted });
    } catch (error) {
      throw new ConflictException(unexpected(error.message));
    }
  }

  async findProductById(
    id: string,
    withDeleted = false,
  ): Promise<Product | undefined> {
    try {
      return await this.findOne(id, { withDeleted });
    } catch (error) {
      throw new ConflictException(unexpected(error.message));
    }
  }

  async getAllProducts(withDeleted = false): Promise<Product[]> {
    try {
      return await this.find({ withDeleted });
    } catch (error) {
      throw new ConflictException(unexpected(error.message));
    }
  }

  async deleteOneById(id: string): Promise<Product | undefined> {
    try {
      const response = await this.createQueryBuilder()
        .softDelete()
        .from(Product)
        .where('id = :id', { id })
        .returning([
          'id',
          'name',
          'type',
          'size',
          'description',
          'stockCount',
          'price',
        ])
        .execute();
      return response.raw[0];
    } catch (error) {
      throw new ConflictException(unexpected(error.message));
    }
  }

  async createProduct(createProductDTO: CreateProductDTO): Promise<Product> {
    try {
      const product = this.create(createProductDTO);
      return await this.save(product);
    } catch (error) {
      throw new ConflictException(unexpected(error.message));
    }
  }
}
