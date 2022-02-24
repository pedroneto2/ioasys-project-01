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

import { EditAddressRequestBodyDTO } from '@shared/dtos/address/editAddressRequestBody.dto';
import { CreateAddressRequestBodyDTO } from '@shared/dtos/address/createAddressRequestBody.dto';
import { Address } from '@shared/entities/addressess/address.entity';
import { instanceToInstance } from 'class-transformer';

import { CrudAddressUseCase } from '@modules/address/contexts/crudAddress/crudAddress.useCase';

@ApiTags('Addressess')
@Controller('address')
export class CrudAddressController {
  constructor(private crudAddressUseCase: CrudAddressUseCase) {}

  @Post('new-address')
  @HttpCode(HttpStatus.CREATED)
  @ApiCreatedResponse({
    type: Address,
  })
  @ApiBadRequestResponse({
    description: 'Bad Request',
  })
  public async createAddress(
    @Body() createAddressRequestBodyDTO: CreateAddressRequestBodyDTO,
    @Request() req,
  ) {
    const { address, state, zipCode } = createAddressRequestBodyDTO;
    const { userID } = req.user;
    const newAddress = await this.crudAddressUseCase.createAddress({
      userID,
      address,
      state,
      zipCode,
    });
    return instanceToInstance(newAddress);
  }

  @Post('edit-address')
  @HttpCode(HttpStatus.OK)
  @ApiCreatedResponse({
    type: Address,
  })
  @ApiBadRequestResponse({
    description: 'Bad Request',
  })
  public async editAddress(
    @Body() editAddressRequestBodyDTO: EditAddressRequestBodyDTO,
    @Request() req,
  ) {
    const { addressID, ...rest } = editAddressRequestBodyDTO;
    const { userID } = req.user;
    const newAddress = await this.crudAddressUseCase.editAddress(
      userID,
      addressID,
      rest,
    );
    return instanceToInstance(newAddress);
  }

  @Get('delete-address/:addressID')
  @HttpCode(HttpStatus.OK)
  @ApiCreatedResponse({
    type: Address,
  })
  @ApiBadRequestResponse({
    description: 'Bad Request',
  })
  public async deleteAddress(
    @Param('addressID') addressID: string,
    @Request() req,
  ) {
    const { userID } = req.user;
    const deletedAddress = await this.crudAddressUseCase.deleteAddress(
      addressID,
      userID,
    );
    return instanceToInstance(deletedAddress);
  }
}
