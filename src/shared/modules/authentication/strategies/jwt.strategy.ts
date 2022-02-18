import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException, Inject } from '@nestjs/common';
import envVariables from '@config/env';

import { BcryptProvider } from '@shared/providers/EncryptProvider/bcrypt.provider';
import { TokensService } from '@shared/modules/authentication/services/tokens.service';

import { PayloadDTO } from '@shared/dtos/authentication/payload.dto';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject('ENCRYPT_PROVIDER')
    private readonly encryption: BcryptProvider,
    private readonly tokensService: TokensService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req) => req?.cookies?.Authentication,
      ]),
      ignoreExpiration: false,
      secretOrKey: envVariables().jwtSecret,
      passReqToCallback: true,
    });
  }

  async validate(req, payload: PayloadDTO): Promise<PayloadDTO> {
    const accessToken = req?.cookies?.Authentication;
    const hashedAccessTokenFromDB = await this.tokensService.findJwtTokenById(
      payload.userID,
    );

    const validAccessToken = await this.encryption.compareHash(
      accessToken,
      hashedAccessTokenFromDB,
    );

    if (!validAccessToken) {
      throw new UnauthorizedException();
    }

    return {
      userID: payload.userID,
      email: payload.email,
      isAdmin: payload.isAdmin,
    };
  }
}
