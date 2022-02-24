import { Controller, HttpCode, HttpStatus, Get, Param } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AdminRoute } from '@shared/decorators/adminRoute.decorator';

import { DisconnectUserUseCase } from '@modules/admin/contexts/disconnectUser/disconnectUser.useCase';

@ApiTags('Admin')
@Controller('admin')
export class DisconnectUserController {
  constructor(private disconnectUserUseCase: DisconnectUserUseCase) {}

  @AdminRoute()
  @Get('/disconnect-user/:userID')
  @HttpCode(HttpStatus.OK)
  @ApiCreatedResponse({
    type: Boolean,
  })
  @ApiBadRequestResponse({
    description: 'Unauthorized',
  })
  public async disconnectUser(@Param('userID') userID: string) {
    const response = await this.disconnectUserUseCase.execute(userID);
    return response;
  }
}
