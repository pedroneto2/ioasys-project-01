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

import { EditUserRequestBodyDTO } from '@shared/dtos/user/editUserRequestBody.dto';
import { instanceToInstance } from 'class-transformer';
import { EditUserUseCase } from '@modules/users/contexts/editUser/editUser.useCase';

@ApiTags('Users')
@Controller('user/edit')
export class EditUserController {
  constructor(private editUserUseCase: EditUserUseCase) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  @ApiCreatedResponse({
    type: EditUserRequestBodyDTO,
  })
  @ApiBadRequestResponse({
    description: 'Unauthorized',
  })
  public async edit(
    @Body() editUserRequestBodyDTO: EditUserRequestBodyDTO,
    @Request() req,
  ) {
    const { userID } = req.user;
    const user = await this.editUserUseCase.execute(
      userID,
      editUserRequestBodyDTO,
    );
    return instanceToInstance(user);
  }
}
