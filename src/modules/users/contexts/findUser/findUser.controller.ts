import {
  Body,
  Controller,
  Get,
  Post,
  HttpCode,
  HttpStatus,
  Request,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiTags,
} from '@nestjs/swagger';
import { instanceToInstance } from 'class-transformer';

import { User } from '@shared/entities/user/user.entity';
import { FindUserUseCase } from '@modules/users/contexts/findUser/findUser.useCase';
import { AdminRoute } from '@shared/decorators/adminRoute.decorator';

import { GetUserByEmailDTO } from '@shared/dtos/user/getUserByEmail.dto';
import { GetUserByIdDTO } from '@shared/dtos/user/getUserById.dto';

@ApiTags('Users')
@Controller('users')
export class FindUserController {
  constructor(private findUserUseCase: FindUserUseCase) {}

  @AdminRoute()
  @Post('getOne/byId')
  @HttpCode(HttpStatus.FOUND)
  @ApiCreatedResponse({
    type: User,
  })
  @ApiBadRequestResponse({
    description: 'Unauthorized',
  })
  public async findOneById(
    @Body() getUserByIdDTO: GetUserByIdDTO,
    @Request() req,
  ) {
    const adminID = req.user.userID;
    const { userID, password } = getUserByIdDTO;
    const user = await this.findUserUseCase.findUserById(
      adminID,
      password,
      userID,
    );
    return instanceToInstance(user);
  }

  @AdminRoute()
  @Post('getOne/byEmail')
  @HttpCode(HttpStatus.FOUND)
  @ApiCreatedResponse({
    type: User,
  })
  @ApiBadRequestResponse({
    description: 'Unauthorized',
  })
  public async findOneByEmail(
    @Body() getUserByEmailDTO: GetUserByEmailDTO,
    @Request() req,
  ) {
    const adminID = req.user.userID;
    const { email, password } = getUserByEmailDTO;
    const user = await this.findUserUseCase.findUserByEmail(
      adminID,
      password,
      email,
    );
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
