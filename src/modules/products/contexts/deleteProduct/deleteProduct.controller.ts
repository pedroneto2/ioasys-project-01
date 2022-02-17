import { Controller, HttpCode, HttpStatus, Param, Get } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiTags,
} from '@nestjs/swagger';

import { instanceToInstance } from 'class-transformer';

import { Product } from '@shared/entities/product/product.entity';
import { DeleteProductUseCase } from '@modules/products/contexts/deleteProduct/deleteProduct.useCase';
import { AdminRoute } from '@shared/decorators/adminRoute.decorator';

@ApiTags('Products')
@Controller('products')
export class DeleteProductController {
  constructor(private deleteProductUseCase: DeleteProductUseCase) {}

  @AdminRoute()
  @Get('deleteOne/:id')
  @HttpCode(HttpStatus.CREATED)
  @ApiCreatedResponse({
    type: Product,
  })
  @ApiBadRequestResponse({
    description: 'Unauthorized',
  })
  public async deleteOneById(@Param('id') id: string) {
    const response = await this.deleteProductUseCase.execute(id);
    return instanceToInstance(response);
  }
}
