import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import envVariables from '@config/env';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: envVariables().jwtSecret,
    });
  }

  async validate(payload: any) {
    return {
      userId: payload.userId,
      userEmail: payload.userEmail,
      isAdmin: payload.isAdmin,
    };
  }
}
