import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiTags,
} from '@nestjs/swagger';

import { CreateUserRequestBodyDTO } from '@shared/dtos/user/createUserRequestBody.dto';
import { User } from '@shared/entities/user/user.entity';
import { instanceToInstance } from 'class-transformer';

import { CreateUserUseCase } from '@modules/users/contexts/createUser/createUser.useCase';
import { Public } from '@shared/decorators/isPublic.decorator';

@ApiTags('Users')
@Controller('users/new-user')
export class CreateUserController {
  constructor(private createUserUseCase: CreateUserUseCase) {}

  @Public()
  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiCreatedResponse({
    type: User,
  })
  @ApiBadRequestResponse({
    description: 'Bad Request',
  })
  public async create(
    @Body() createUserRequestBodyDTO: CreateUserRequestBodyDTO,
  ) {
    const user = await this.createUserUseCase.execute(createUserRequestBodyDTO);
    return instanceToInstance(user);
  }
}
