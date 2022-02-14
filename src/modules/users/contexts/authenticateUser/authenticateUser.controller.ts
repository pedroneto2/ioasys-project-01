import { Controller, Request, Post, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from '@modules/users/contexts/authenticateUser/localAuth.guard';

@Controller('auth')
export class AuthenticateUser {
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    return req.user;
  }
}
