import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Request,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiTags,
} from '@nestjs/swagger';

import { StructuredOrderProductDTO } from '@shared/dtos/orderProduct/structuredOrderProduct.dto';

import { Order } from '@shared/entities/order/order.entity';
import { instanceToInstance } from 'class-transformer';

import { GetOrderDetailsUseCase } from '@modules/orders/contexts/getOrderDetails/getOrderDetails.useCase';

@ApiTags('Orders')
@Controller('orders')
export class GetOrderDetailsController {
  constructor(private getOrderDetailsUseCase: GetOrderDetailsUseCase) {}

  @Get('get-orders-info')
  @HttpCode(HttpStatus.OK)
  @ApiCreatedResponse({
    type: [Order],
  })
  @ApiBadRequestResponse({
    description: 'Bad Request',
  })
  public async getOrdersRequested(@Request() req) {
    const response = await this.getOrderDetailsUseCase.getUserOrdersInfo(
      req.user.userID,
    );
    return instanceToInstance(response);
  }

  @Get('get-order-details')
  @HttpCode(HttpStatus.OK)
  @ApiCreatedResponse({
    type: StructuredOrderProductDTO,
  })
  @ApiBadRequestResponse({
    description: 'Bad Request',
  })
  public async getOrderDetailsInProgress(@Request() req) {
    const response =
      await this.getOrderDetailsUseCase.getUserOrderDetailsInProgress(
        req.user.userID,
      );
    return instanceToInstance(response);
  }

  @Get('get-order-details/checked-out/:orderID')
  @HttpCode(HttpStatus.OK)
  @ApiCreatedResponse({
    type: StructuredOrderProductDTO,
  })
  @ApiBadRequestResponse({
    description: 'Bad Request',
  })
  public async getCheckedOutOrderDetailsInProgress(
    @Param('orderID') orderID: string,
    @Request() req,
  ) {
    const productsStamp =
      await this.getOrderDetailsUseCase.getOrderProductsStamp(
        req.user.userID,
        orderID,
      );
    return instanceToInstance(productsStamp);
  }
}
