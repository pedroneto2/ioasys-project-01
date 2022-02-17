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

import { PasswordRequestBodyDTO } from '@shared/dtos/user/passwordRequestBody.dto';
import { DeleteUserUseCase } from '@modules/users/contexts/deleteUser/deleteUser.useCase';
import { User } from '@shared/entities/user/user.entity';

@ApiTags('Users')
@Controller('user/delete')
export class DeleteUserController {
  constructor(private deleteUserUseCase: DeleteUserUseCase) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  @ApiCreatedResponse({
    type: User,
  })
  @ApiBadRequestResponse({
    description: 'Unauthorized',
  })
  public async deleteOwnUser(
    @Body() passwordRequestBodyDTO: PasswordRequestBodyDTO,
    @Request() req,
  ) {
    const { userId } = req.user;
    const response = await this.deleteUserUseCase.execute(
      userId,
      passwordRequestBodyDTO.password,
    );
    return response;
  }
}
