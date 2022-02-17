import { Controller, Get, HttpCode, HttpStatus, Param } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiTags,
} from '@nestjs/swagger';
import { instanceToInstance } from 'class-transformer';

import { User } from '@shared/entities/user/user.entity';
import { FindUserUseCase } from '@modules/users/contexts/findUser/findUser.useCase';
import { AdminRoute } from '@shared/decorators/adminRoute.decorator';

@ApiTags('Users')
@Controller('users')
export class FindUserController {
  constructor(private findUserUseCase: FindUserUseCase) {}

  @AdminRoute()
  @Get('getOne/byId/:id')
  @HttpCode(HttpStatus.FOUND)
  @ApiCreatedResponse({
    type: User,
  })
  @ApiBadRequestResponse({
    description: 'Unauthorized',
  })
  public async findOneById(@Param('id') id: string) {
    const user = await this.findUserUseCase.findUserById(id);
    return instanceToInstance(user);
  }

  @AdminRoute()
  @Get('getOne/byEmail/:email')
  @HttpCode(HttpStatus.FOUND)
  @ApiCreatedResponse({
    type: User,
  })
  @ApiBadRequestResponse({
    description: 'Unauthorized',
  })
  public async findOneByEmail(@Param('email') id: string) {
    const user = await this.findUserUseCase.findUserByEmail(id);
    return instanceToInstance(user);
  }

  @AdminRoute()
  @Get('getAll')
  @HttpCode(HttpStatus.FOUND)
  @ApiCreatedResponse({
    type: [User],
  })
  @ApiBadRequestResponse({
    description: 'Unauthorized',
  })
  public async getAll() {
    const users = await this.findUserUseCase.getAllUsers();
    return instanceToInstance(users);
  }
}
