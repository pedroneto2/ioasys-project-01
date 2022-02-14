import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthenticateUserUseCase } from '@modules/users/contexts/authenticateUser/authenticateUser.useCase';
import { User } from '@shared/entities/user/user.entity';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authenticateUserUseCase: AuthenticateUserUseCase) {
    super();
  }

  async validate(email: string, password: string): Promise<User> {
    const user = await this.authenticateUserUseCase.validateUser(
      email,
      password,
    );
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
