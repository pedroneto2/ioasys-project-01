import {
  Controller,
  HttpCode,
  HttpStatus,
  Request,
  Post,
  Body,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiTags,
} from '@nestjs/swagger';

import { ConvertUserToAdminRequestBodyDTO } from '@shared/dtos/admin/convertUserToAdminRequestBody.dto';
import { instanceToInstance } from 'class-transformer';
import { HandleUserAdminUseCase } from '@modules/admin/contexts/handleUserAdmin/handleUserAdmin.useCase';

import { AdminRoute } from '@shared/decorators/adminRoute.decorator';

@ApiTags('Admin')
@Controller('admin')
export class ConvertUserToAdminUserController {
  constructor(private handleUserAdminUseCase: HandleUserAdminUseCase) {}

  @AdminRoute()
  @Post('/handleUserAdmin')
  @HttpCode(HttpStatus.OK)
  @ApiCreatedResponse({
    type: ConvertUserToAdminRequestBodyDTO,
  })
  @ApiBadRequestResponse({
    description: 'Unauthorized',
  })
  public async convertUserToAdmin(
    @Body() { userID, password, isAdmin }: ConvertUserToAdminRequestBodyDTO,
    @Request() req,
  ) {
    const adminID = req.user.userID;
    const user = await this.handleUserAdminUseCase.convertUserToAdmin(
      adminID,
      userID,
      password,
      isAdmin,
    );
    return instanceToInstance(user);
  }
}
