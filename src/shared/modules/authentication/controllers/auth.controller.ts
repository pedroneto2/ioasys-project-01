import {
  Controller,
  Request,
  Post,
  Get,
  UseGuards,
  Body,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Public } from '@shared/decorators/isPublic.decorator';

import { LoginRequestBodyDTO } from '@shared/dtos/authentication/loginRequestBody.dto';
import { LocalAuthGuard } from '@shared/modules/authentication/guards/local-auth.guard';
import { AuthService } from '@shared/modules/authentication/services/auth.service';
import { RefreshTokenAuthGuard } from '@shared/modules/authentication/guards/refresh-auth.guard';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Public()
  @Post('login')
  @HttpCode(HttpStatus.ACCEPTED)
  @ApiCreatedResponse({
    description: 'successfully authenticated',
  })
  @ApiBadRequestResponse({
    description: 'Bad Request',
  })
  async login(@Body() loginBody: LoginRequestBodyDTO, @Request() req) {
    const { accessCookie, refreshCookie } = await this.authService.login(
      req.user,
    );
    req.res.setHeader('Set-Cookie', [accessCookie, refreshCookie]);
    return req.user;
  }

  @UseGuards(RefreshTokenAuthGuard)
  @Public()
  @Get('refresh')
  @HttpCode(HttpStatus.ACCEPTED)
  @ApiCreatedResponse({
    description: 'successfully refreshed',
  })
  @ApiBadRequestResponse({
    description: 'Unauthorized',
  })
  async refresh(@Request() req) {
    const accessCookie = await this.authService.refresh(req.user);
    req.res.setHeader('Set-Cookie', accessCookie);
    return req.user;
  }

  @Get('logout')
  @HttpCode(HttpStatus.ACCEPTED)
  @ApiCreatedResponse({
    description: 'successfully logged out',
  })
  @ApiBadRequestResponse({
    description: 'not logged in',
  })
  async logout(@Request() req) {
    await this.authService.removeTokensFromUser(req.user.userID);
    const logoutCookies = this.authService.logout();
    req.res.setHeader('Set-Cookie', logoutCookies);
    return { message: 'successfully logged out' };
  }
}
