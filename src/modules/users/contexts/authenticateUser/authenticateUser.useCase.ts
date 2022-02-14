import { Injectable, Inject } from '@nestjs/common';
import { FindUserUseCase } from '@modules/users/contexts/findUser/findUser.useCase';
import { BcryptProvider } from '@shared/providers/EncryptProvider/bcrypt.provider';
import { User } from '@shared/entities/user/user.entity';

@Injectable()
export class AuthenticateUserUseCase {
  constructor(
    private findUserUseCase: FindUserUseCase,
    @Inject('ENCRYPT_PROVIDER')
    private encryption: BcryptProvider,
  ) {}

  async validateUser(email: string, password: string): Promise<User | null> {
    const user = await this.findUserUseCase.findOne(email);
    if (user && this.encryption.compareHash(password, user.password)) {
      return user;
    }
    return null;
  }
}
