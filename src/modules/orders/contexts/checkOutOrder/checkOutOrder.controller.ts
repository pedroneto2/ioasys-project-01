import {
  Controller,
  HttpCode,
  HttpStatus,
  Body,
  Post,
  Request,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiTags,
} from '@nestjs/swagger';

import { CheckOutOrderRequestBody } from '@shared/dtos/order/checkOutOrderRequestBody.dto';
import { Order } from '@shared/entities/order/order.entity';
import { instanceToInstance } from 'class-transformer';

import { CheckOutOrderUseCase } from '@modules/orders/contexts/checkOutOrder/checkOutOrder.useCase';

@ApiTags('Orders')
@Controller('orders')
export class CheckOutOrderController {
  constructor(private checkOutOrderUseCase: CheckOutOrderUseCase) {}

  @Post('check-out-order-in-progress')
  @HttpCode(HttpStatus.OK)
  @ApiCreatedResponse({
    type: Order,
  })
  @ApiBadRequestResponse({
    description: 'Bad Request',
  })
  public async checkOut(
    @Body() { providedAddressID }: CheckOutOrderRequestBody,
    @Request() req,
  ) {
    const response = await this.checkOutOrderUseCase.checkOutOrder(
      req.user.userID,
      providedAddressID,
    );
    return instanceToInstance(response);
  }
}
