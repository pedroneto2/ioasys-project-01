import { Controller, HttpCode, HttpStatus, Param, Get } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiTags,
} from '@nestjs/swagger';

import { Product } from '@shared/entities/product/product.entity';
import { instanceToInstance } from 'class-transformer';

import { FindProductUseCase } from '@modules/products/contexts/findProduct/findProduct.useCase';
import { AdminRoute } from '@shared/decorators/adminRoute.decorator';

@ApiTags('Products')
@Controller('products')
export class FindProductController {
  constructor(private findProductUseCase: FindProductUseCase) {}

  @AdminRoute()
  @Get('findOne/:name')
  @HttpCode(HttpStatus.CREATED)
  @ApiCreatedResponse({
    type: Product,
  })
  @ApiBadRequestResponse({
    description: 'Unauthorized',
  })
  public async findProductByName(@Param('name') name: string) {
    const product = await this.findProductUseCase.findProductByName(name);
    return instanceToInstance(product);
  }

  @AdminRoute()
  @Get('getAll')
  @HttpCode(HttpStatus.CREATED)
  @ApiCreatedResponse({
    type: [Product],
  })
  @ApiBadRequestResponse({
    description: 'Unauthorized',
  })
  public async getAll() {
    const products = await this.findProductUseCase.getAllProducts();
    return instanceToInstance(products);
  }
}
