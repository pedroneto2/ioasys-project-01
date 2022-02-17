import { Injectable, Inject, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { UserRepository } from '@modules/users/repository/user.repository';
import { BcryptProvider } from '@shared/providers/EncryptProvider/bcrypt.provider';
import { User } from '@shared/entities/user/user.entity';

@Injectable()
export class DeleteUserUseCase {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    @Inject('ENCRYPT_PROVIDER')
    private encryption: BcryptProvider,
  ) {}

  async execute(id: string, password: string): Promise<User> {
    const user = await this.userRepository.findUserById(id);
    const validPassword = await this.encryption.compareHash(
      password,
      user.password,
    );
    if (!validPassword) {
      throw new UnauthorizedException();
    }
    const response = await this.userRepository.deleteUserById(id);
    return response;
  }
}
