import {
  Controller,
  UseGuards,
  Get,
  HttpCode,
  HttpStatus,
  Param,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiTags,
} from '@nestjs/swagger';

import { User } from '@shared/entities/user/user.entity';
import { instanceToInstance } from 'class-transformer';
import { FindUserUseCase } from '@modules/users/contexts/findUser/findUser.useCase';
import { JwtAuthGuard } from '@shared/modules/auth/jwt-auth.guard';

@ApiTags('Users')
@Controller('users')
export class FindUserController {
  constructor(private findUserUseCase: FindUserUseCase) {}

  @UseGuards(JwtAuthGuard)
  @Get('getOne/byId/:id')
  @HttpCode(HttpStatus.CREATED)
  @ApiCreatedResponse({
    type: User,
  })
  @ApiBadRequestResponse({
    description: 'Bad Request',
  })
  public async findUserById(@Param('id') id: string) {
    const user = await this.findUserUseCase.findById(id);
    return instanceToInstance(user);
  }

  @Get('getOne/byEmail/:email')
  @HttpCode(HttpStatus.CREATED)
  @ApiCreatedResponse({
    type: User,
  })
  @ApiBadRequestResponse({
    description: 'Bad Request',
  })
  public async findUserByEmail(@Param('email') id: string) {
    const user = await this.findUserUseCase.findByEmail(id);
    return instanceToInstance(user);
  }

  @UseGuards(JwtAuthGuard)
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
