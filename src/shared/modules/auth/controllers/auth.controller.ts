import { Controller, Request, Post, UseGuards } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Public } from '@shared/decorators/isPublic.decorator';

import { LocalAuthGuard } from '@shared/modules/auth/local-auth.guard';
import { AuthService } from '@shared/modules/auth/services/auth.service';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Public()
  @Post('login')
  @ApiCreatedResponse({
    description: 'successfully authenticated',
  })
  @ApiBadRequestResponse({
    description: 'Bad Request',
  })
  async login(@Request() req) {
    return this.authService.login(req.user);
  }
}
