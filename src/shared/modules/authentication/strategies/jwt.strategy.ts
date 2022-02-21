import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException, Inject } from '@nestjs/common';
import envVariables from '@config/env';
import { InjectRepository } from '@nestjs/typeorm';

import { BcryptProvider } from '@shared/providers/EncryptProvider/bcrypt.provider';
import { TokensRepository } from '@shared/modules/authentication/repository/tokens.repository';

import { PayloadDTO } from '@shared/dtos/authentication/payload.dto';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject('ENCRYPT_PROVIDER')
    private readonly encryption: BcryptProvider,
    @InjectRepository(TokensRepository)
    private readonly tokensRepository: TokensRepository,
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

    const jwtTokens = await this.tokensRepository.findTokensByUserId(
      payload.userID,
    );

    if (!jwtTokens.jwtToken) {
      throw new UnauthorizedException();
    }

    const hashedAccessTokenFromDB = jwtTokens.jwtToken;

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
