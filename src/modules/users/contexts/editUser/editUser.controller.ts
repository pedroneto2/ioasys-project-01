import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiTags,
} from '@nestjs/swagger';

import { EditUserRequestBodyDTO } from '@shared/dtos/user/editUserRequestBody.dto';
import { User } from '@shared/entities/user/user.entity';
import { instanceToInstance } from 'class-transformer';
import { EditUserUseCase } from '@modules/users/contexts/editUser/editUser.useCase';
import { JwtAuthGuard } from '@shared/modules/auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@ApiTags('Users')
@Controller('user/edit')
export class EditUserController {
  constructor(private editUserUseCase: EditUserUseCase) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiCreatedResponse({
    type: User,
  })
  @ApiBadRequestResponse({
    description: 'Bad Request',
  })
  public async create(
    @Body() editUserRequestBodyDTO: EditUserRequestBodyDTO,
    @Request() req,
  ) {
    const { userId } = req.user;
    console.log(req.user);
    const user = await this.editUserUseCase.execute(
      userId,
      editUserRequestBodyDTO,
    );
    return instanceToInstance(user);
  }
}
