import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
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

  @Get('getOrdersInfo')
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

  @Get('getOrderDetails')
  @HttpCode(HttpStatus.OK)
  @ApiCreatedResponse({
    type: StructuredOrderProductDTO,
  })
  @ApiBadRequestResponse({
    description: 'Bad Request',
  })
  public async getOrderPricesInProgress(@Request() req) {
    const response =
      await this.getOrderDetailsUseCase.getUserOrderPricesInProgress(
        req.user.userID,
      );
    return instanceToInstance(response);
  }

  @Get('getOrderDetailsByOrderId/:orderID')
  @HttpCode(HttpStatus.OK)
  @ApiCreatedResponse({
    type: StructuredOrderProductDTO,
  })
  @ApiBadRequestResponse({
    description: 'Bad Request',
  })
  public async getOrderDetails(
    @Param('orderID') orderID: string,
    @Request() req,
  ) {
    const response = await this.getOrderDetailsUseCase.getUserOrdersDetailsById(
      req.user.userID,
      orderID,
    );
    return instanceToInstance(response);
  }

  @Get('checkOutOrderInProgress')
  @HttpCode(HttpStatus.OK)
  @ApiCreatedResponse({
    type: Order,
  })
  @ApiBadRequestResponse({
    description: 'Bad Request',
  })
  public async checkOut(@Request() req) {
    const response = await this.getOrderDetailsUseCase.checkOutOrder(
      req.user.userID,
    );
    return instanceToInstance(response);
  }
}
