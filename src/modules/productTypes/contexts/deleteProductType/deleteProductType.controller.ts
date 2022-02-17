import { Controller, HttpCode, HttpStatus, Param, Get } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiTags,
} from '@nestjs/swagger';

import { instanceToInstance } from 'class-transformer';

import { DeleteProductTypeUseCase } from '@modules/productTypes/contexts/deleteProductType/deleteProductType.useCase';
import { AdminRoute } from '@shared/decorators/adminRoute.decorator';
import { ProductType } from '@shared/entities/productType/productType.entity';

@ApiTags('Product Types')
@Controller('product-types')
export class DeleteProductTypeController {
  constructor(private deleteProductTypeUseCase: DeleteProductTypeUseCase) {}

  @AdminRoute()
  @Get('deleteOne/:name')
  @HttpCode(HttpStatus.CREATED)
  @ApiCreatedResponse({
    type: ProductType,
  })
  @ApiBadRequestResponse({
    description: 'Unauthorized',
  })
  public async deleteOneByType(@Param('name') name: string) {
    const response = await this.deleteProductTypeUseCase.execute(name);
    return instanceToInstance(response);
  }
}
