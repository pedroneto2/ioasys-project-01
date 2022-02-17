import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiTags,
} from '@nestjs/swagger';

import { CreateProductRequestBodyDTO } from '@shared/dtos/product/createProductRequestBody.dto';
import { Product } from '@shared/entities/product/product.entity';
import { instanceToInstance } from 'class-transformer';

import { CreateProductUseCase } from '@modules/products/contexts/createProduct/createProduct.useCase';
import { AdminRoute } from '@shared/decorators/adminRoute.decorator';

@ApiTags('Products')
@Controller('products/new-product')
export class CreateProductController {
  constructor(private createProductUseCase: CreateProductUseCase) {}

  @AdminRoute()
  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiCreatedResponse({
    type: Product,
  })
  @ApiBadRequestResponse({
    description: 'Bad Request',
  })
  public async create(
    @Body() createProductRequestBodyDTO: CreateProductRequestBodyDTO,
  ) {
    const type = await this.createProductUseCase.execute(
      createProductRequestBodyDTO,
    );
    return instanceToInstance(type);
  }
}
