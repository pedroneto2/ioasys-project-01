import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiTags,
} from '@nestjs/swagger';

import { CreateProductTypeRequestBodyDTO } from '@shared/dtos/productType/createProductTypeRequestBody.dto';
import { ProductType } from '@shared/entities/productType/productType.entity';
import { instanceToInstance } from 'class-transformer';

import { CreateProductTypeUseCase } from '@modules/productTypes/contexts/createProductType/createProductType.useCase';
import { AdminRoute } from '@shared/decorators/adminRoute.decorator';

@ApiTags('Product Types')
@Controller('product-types/new-product-type')
export class CreateProductTypeController {
  constructor(private createProductTypeUseCase: CreateProductTypeUseCase) {}

  @AdminRoute()
  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiCreatedResponse({
    type: ProductType,
  })
  @ApiBadRequestResponse({
    description: 'Bad Request',
  })
  public async create(
    @Body() createProductTypeRequestBodyDTO: CreateProductTypeRequestBodyDTO,
  ) {
    const type = await this.createProductTypeUseCase.execute(
      createProductTypeRequestBodyDTO,
    );
    return instanceToInstance(type);
  }
}
