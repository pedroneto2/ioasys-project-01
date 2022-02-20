import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Request,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiTags,
} from '@nestjs/swagger';

import { HandleProductToOrderRequestBodyDTO } from '@shared/dtos/order/handleProductToOrderRequestBody.dto';
import { HandleProductToOrderResponseBodyDTO } from '@shared/dtos/order/handleProductToOrderResponseBody.dto';
import { instanceToInstance } from 'class-transformer';

import { HandleProductToOrderUseCase } from '@modules/orders/contexts/handleProductOrder/handleProductOrder.useCase';

@ApiTags('Orders')
@Controller('orders')
export class HandleProductToOrderController {
  constructor(
    private handleProductToOrderUseCase: HandleProductToOrderUseCase,
  ) {}

  @Post('handleProduct')
  @HttpCode(HttpStatus.ACCEPTED)
  @ApiCreatedResponse({
    type: HandleProductToOrderResponseBodyDTO,
  })
  @ApiBadRequestResponse({
    description: 'Bad Request',
  })
  public async handleProductToOrder(
    @Body()
    handleProductToOrderRequestBodyDTO: HandleProductToOrderRequestBodyDTO,
    @Request() req,
  ) {
    const { itemID, addOrRemove } = handleProductToOrderRequestBodyDTO;
    const response =
      await this.handleProductToOrderUseCase.handleProductToOrder(
        req.user.userID,
        itemID,
        addOrRemove,
      );
    return instanceToInstance(response);
  }
}
