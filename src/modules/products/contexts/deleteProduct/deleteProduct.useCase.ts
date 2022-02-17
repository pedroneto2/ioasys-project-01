import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductRepository } from '@modules/products/repository/product.repository';
import { Product } from '@shared/entities/product/product.entity';

@Injectable()
export class DeleteProductUseCase {
  constructor(
    @InjectRepository(ProductRepository)
    private productRepository: ProductRepository,
  ) {}

  async execute(id: string): Promise<Product> {
    return await this.productRepository.deleteOneById(id);
  }
}
