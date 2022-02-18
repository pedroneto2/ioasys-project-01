import { Injectable, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { notFound } from '@shared/constants/errors';
import { ProductRepository } from '@modules/products/repository/product.repository';
import { Product } from '@shared/entities/product/product.entity';

@Injectable()
export class DeleteProductUseCase {
  constructor(
    @InjectRepository(ProductRepository)
    private readonly productRepository: ProductRepository,
  ) {}

  async execute(id: string): Promise<Product> {
    const response = await this.productRepository.deleteOneById(id);

    if (!response) {
      throw new ConflictException(notFound('Product'));
    }

    return response;
  }
}
