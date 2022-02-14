import { Controller, Get, HttpCode, HttpStatus, Query } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';

import { User } from '@shared/entities/user/user.entity';
import { instanceToInstance } from 'class-transformer';

import { FindUserUseCase } from './findUser.useCase';

@ApiTags('Users')
@Controller('users')
export class FindUserController {
  constructor(private findUserUseCase: FindUserUseCase) {}

  @Get('getone?')
  @HttpCode(HttpStatus.CREATED)
  @ApiCreatedResponse({
    type: User,
  })
  @ApiBadRequestResponse({
    description: 'Bad Request',
  })
  @ApiQuery({
    name: 'id',
    required: false,
    type: String,
  })
  @ApiQuery({
    name: 'email',
    required: false,
    type: String,
  })
  public async findUser(
    @Query('id') id?: string,
    @Query('email') email?: string,
  ) {
    const user = await this.findUserUseCase.findOne(id, email);
    return instanceToInstance(user);
  }

  @Get('getAll')
  @HttpCode(HttpStatus.CREATED)
  @ApiCreatedResponse({
    type: User,
  })
  @ApiBadRequestResponse({
    description: 'Bad Request',
  })
  public async getAll() {
    const user = await this.findUserUseCase.getAll();
    return instanceToInstance(user);
  }
}
