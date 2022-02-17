import { Controller, HttpCode, HttpStatus, Param, Get } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiTags,
} from '@nestjs/swagger';

import { ProductType } from '@shared/entities/productType/productType.entity';
import { instanceToInstance } from 'class-transformer';

import { FindProductTypeUseCase } from '@modules/productTypes/contexts/findProductType/findProductType.useCase';
import { AdminRoute } from '@shared/decorators/adminRoute.decorator';

@ApiTags('Product Types')
@Controller('product-types')
export class FindProductTypeController {
  constructor(private findProductTypeUseCase: FindProductTypeUseCase) {}

  @AdminRoute()
  @Get('findOne/:name')
  @HttpCode(HttpStatus.CREATED)
  @ApiCreatedResponse({
    type: ProductType,
  })
  @ApiBadRequestResponse({
    description: 'Unauthorized',
  })
  public async findOneByName(@Param('name') name: string) {
    const productType = await this.findProductTypeUseCase.findProductTypeByName(
      name,
    );
    return instanceToInstance(productType);
  }

  @AdminRoute()
  @Get('getAll')
  @HttpCode(HttpStatus.CREATED)
  @ApiCreatedResponse({
    type: [ProductType],
  })
  @ApiBadRequestResponse({
    description: 'Unauthorized',
  })
  public async getAll() {
    const productTypes = await this.findProductTypeUseCase.getAllProductTypes();
    return instanceToInstance(productTypes);
  }
}
