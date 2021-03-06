import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { alreadyExists } from '@shared/constants/errors';
import { softDeleted } from '@shared/constants/errors';

import { CreateProductRequestBodyDTO } from '@shared/dtos/product/createProductRequestBody.dto';
import { Product } from '@shared/entities/product/product.entity';
import { ProductRepository } from '@modules/products/repository/product.repository';

import { v4 as uuidV4 } from 'uuid';

@Injectable()
export class CreateProductUseCase {
  constructor(
    @InjectRepository(ProductRepository)
    private readonly productRepository: ProductRepository,
  ) {}

  async execute({
    name,
    stockCount,
    size,
    description,
    price,
    type,
  }: CreateProductRequestBodyDTO): Promise<Product> {
    const savedProduct = await this.productRepository.findProductByName(
      name,
      true,
    );

    if (savedProduct) {
      if (savedProduct.deletedAt) {
        throw new ConflictException(softDeleted('Product'));
      }
      throw new ConflictException(alreadyExists('Product'));
    }

    const newProduct = await this.productRepository.createProduct({
      id: uuidV4(),
      name,
      stockCount,
      size,
      description,
      price,
      type,
    });
    return newProduct;
  }
}
