import { Injectable, Inject } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { FindUserUseCase } from '@modules/users/contexts/findUser/findUser.useCase';
import { BcryptProvider } from '@shared/providers/EncryptProvider/bcrypt.provider';
import { User } from '@shared/entities/user/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private findUserUseCase: FindUserUseCase,
    @Inject('ENCRYPT_PROVIDER')
    private encryption: BcryptProvider,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<User | null> {
    const user = await this.findUserUseCase.findByEmail(email);
    const validPassword = await this.encryption.compareHash(
      password,
      user.password,
    );
    if (user && validPassword) {
      return user;
    }
    return null;
  }

  async login(user: User) {
    const payload = {
      userId: user.id,
      userEmail: user.email,
      isAdmin: user.admin,
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
