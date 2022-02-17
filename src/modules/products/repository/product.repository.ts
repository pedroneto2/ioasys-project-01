import { EntityRepository, Repository } from 'typeorm';
import { ConflictException } from '@nestjs/common';

import { CreateProductDTO } from '@shared/dtos/product/createProduct.dto';
import { Product } from '@shared/entities/product/product.entity';
import { unexpected } from '@shared/constants/errors';

@EntityRepository(Product)
export class ProductRepository extends Repository<Product> {
  async findProductByName(name: string): Promise<Product | undefined> {
    try {
      return await this.findOne({ name });
    } catch (error) {
      throw new ConflictException(unexpected(error.message));
    }
  }

  async findProductById(id: string): Promise<Product | undefined> {
    try {
      return await this.findOne(id);
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
