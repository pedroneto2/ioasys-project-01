import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Request,
  Param,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiTags,
} from '@nestjs/swagger';
import { instanceToInstance } from 'class-transformer';

import { SetDefaultAddressUseCase } from '@modules/users/contexts/setDefaultAddress/setDefaultAddress.useCase';

@ApiTags('Users')
@Controller('users')
export class SetDefaultAddressController {
  constructor(private setDefaultAddressUseCase: SetDefaultAddressUseCase) {}

  @Get('defaultAddress/:addressID')
  @HttpCode(HttpStatus.ACCEPTED)
  @ApiCreatedResponse({
    type: Boolean,
  })
  @ApiBadRequestResponse({
    description: 'Unauthorized',
  })
  public async setDefaultAddress(
    @Param('addressID') addressID: string,
    @Request() req,
  ) {
    const { userID } = req.user;
    const response = await this.setDefaultAddressUseCase.setDefaultAddress(
      addressID,
      userID,
    );
    return instanceToInstance(response);
  }

  @Get('remove-defaultAddress')
  @HttpCode(HttpStatus.ACCEPTED)
  @ApiCreatedResponse({
    type: Boolean,
  })
  @ApiBadRequestResponse({
    description: 'Unauthorized',
  })
  public async removeDefaultAddress(@Request() req) {
    const { userID } = req.user;
    const response = await this.setDefaultAddressUseCase.removeDefaultAddress(
      userID,
    );
    return instanceToInstance(response);
  }
}
