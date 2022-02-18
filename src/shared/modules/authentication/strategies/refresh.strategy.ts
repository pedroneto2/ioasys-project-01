import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException, Inject } from '@nestjs/common';
import envVariables from '@config/env';

import { BcryptProvider } from '@shared/providers/EncryptProvider/bcrypt.provider';
import { TokensService } from '@shared/modules/authentication/services/tokens.service';

import { PayloadDTO } from '@shared/dtos/authentication/payload.dto';

@Injectable()
export class RefreshStrategy extends PassportStrategy(
  Strategy,
  'refresh-token-auth',
) {
  constructor(
    @Inject('ENCRYPT_PROVIDER')
    private encryption: BcryptProvider,
    private tokensService: TokensService,
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
    console.log('refresh-strategy');
    const refreshToken = req?.cookies?.Refresh;
    const hashedRefreshTokenFromDB =
      await this.tokensService.findRefreshTokenById(payload.userID);

    const validRefreshToken = await this.encryption.compareHash(
      refreshToken,
      hashedRefreshTokenFromDB,
    );

    if (!validRefreshToken) {
      await this.tokensService.deleteRefreshToken(payload.userID);
      throw new UnauthorizedException();
    }

    return {
      userID: payload.userID,
      email: payload.email,
      isAdmin: payload.isAdmin,
    };
  }
}
