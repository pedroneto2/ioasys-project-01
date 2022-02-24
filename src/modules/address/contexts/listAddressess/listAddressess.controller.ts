import { Controller, Get, HttpCode, HttpStatus, Request } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiTags,
} from '@nestjs/swagger';

import { Address } from '@shared/entities/addressess/address.entity';
import { instanceToInstance } from 'class-transformer';

import { ListAddressessUseCase } from '@modules/address/contexts/listAddressess/listAddressess.useCase';

@ApiTags('Addressess')
@Controller('address')
export class ListAddressessController {
  constructor(private listAddressessUseCase: ListAddressessUseCase) {}

  @Get('list-addressess')
  @HttpCode(HttpStatus.CREATED)
  @ApiCreatedResponse({
    type: [Address],
  })
  @ApiBadRequestResponse({
    description: 'Bad Request',
  })
  public async createAddress(@Request() req) {
    const { userID } = req.user;
    const addressess = await this.listAddressessUseCase.listAddressess(userID);
    return instanceToInstance(addressess);
  }
}
