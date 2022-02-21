import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import envVariables from '@config/env';

import { BcryptProvider } from '@shared/providers/EncryptProvider/bcrypt.provider';

import { TokensRepository } from '@shared/modules/authentication/repository/tokens.repository';

import { PayloadDTO } from '@shared/dtos/authentication/payload.dto';

@Injectable()
export class RefreshStrategy extends PassportStrategy(
  Strategy,
  'refresh-token-auth',
) {
  constructor(
    @Inject('ENCRYPT_PROVIDER')
    private readonly encryption: BcryptProvider,
    @InjectRepository(TokensRepository)
    private readonly tokensRepository: TokensRepository,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req) => req?.cookies?.Refresh,
      ]),
      ignoreExpiration: false,
      secretOrKey: envVariables().refreshSecret,
      passReqToCallback: true,
    });
  }

  async validate(req, payload: PayloadDTO): Promise<PayloadDTO> {
    const refreshToken = req?.cookies?.Refresh;

    const jwtToken = await this.tokensRepository.findTokensByUserId(
      payload.userID,
    );

    if (!jwtToken.refreshToken) {
      throw new UnauthorizedException();
    }

    const hashedRefreshTokenFromDB = jwtToken.refreshToken;

    const validRefreshToken = await this.encryption.compareHash(
      refreshToken,
      hashedRefreshTokenFromDB,
    );

    if (!validRefreshToken) {
      throw new UnauthorizedException();
    }

    return {
      userID: payload.userID,
      email: payload.email,
      isAdmin: payload.isAdmin,
    };
  }
}
