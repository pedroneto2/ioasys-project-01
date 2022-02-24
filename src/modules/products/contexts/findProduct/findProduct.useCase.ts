import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { notFound } from '@shared/constants/errors';

import { Product } from '@shared/entities/product/product.entity';
import { ProductRepository } from '@modules/products/repository/product.repository';

@Injectable()
export class FindProductUseCase {
  constructor(
    @InjectRepository(ProductRepository)
    private readonly productRepository: ProductRepository,
  ) {}

  async findProductByName(name: string): Promise<Product> {
    const savedProduct = await this.productRepository.findProductByName(name);

    if (!savedProduct) {
      throw new ConflictException(notFound('Product'));
    }

    return savedProduct;
  }

  async getAllProducts(): Promise<Product[]> {
    return await this.productRepository.getAllProducts();
  }

  async productsShowCase(): Promise<Product[]> {
    return await this.productRepository.productsShowCase();
  }
}
