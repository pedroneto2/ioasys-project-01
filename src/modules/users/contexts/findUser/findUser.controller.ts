import { Controller, Get, HttpCode, HttpStatus, Param } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiTags,
} from '@nestjs/swagger';

import { User } from '@shared/entities/user/user.entity';
import { instanceToInstance } from 'class-transformer';
import { FindUserUseCase } from '@modules/users/contexts/findUser/findUser.useCase';

@ApiTags('Users')
@Controller('users')
export class FindUserController {
  constructor(private findUserUseCase: FindUserUseCase) {}

  @Get('getOne/byId/:id')
  @HttpCode(HttpStatus.FOUND)
  @ApiCreatedResponse({
    type: User,
  })
  @ApiBadRequestResponse({
    description: 'Unauthorized',
  })
  public async findUserById(@Param('id') id: string) {
    const user = await this.findUserUseCase.findById(id);
    return instanceToInstance(user);
  }

  @Get('getOne/byEmail/:email')
  @HttpCode(HttpStatus.FOUND)
  @ApiCreatedResponse({
    type: User,
  })
  @ApiBadRequestResponse({
    description: 'Unauthorized',
  })
  public async findUserByEmail(@Param('email') id: string) {
    const user = await this.findUserUseCase.findByEmail(id);
    return instanceToInstance(user);
  }

  @Get('getAll')
  @HttpCode(HttpStatus.FOUND)
  @ApiCreatedResponse({
    type: [User],
  })
  @ApiBadRequestResponse({
    description: 'Unauthorized',
  })
  public async getAll() {
    const user = await this.findUserUseCase.getAll();
    return instanceToInstance(user);
  }
}
