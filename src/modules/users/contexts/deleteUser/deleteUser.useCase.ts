import { Injectable, Inject, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { UserRepository } from '@modules/users/repository/user.repository';
import { User } from '@shared/entities/user/user.entity';

import { CryptoProvider } from '@shared/providers/EncryptProvider/crypto.provider';
import { BcryptProvider } from '@shared/providers/EncryptProvider/bcrypt.provider';

@Injectable()
export class DeleteUserUseCase {
  constructor(
    @InjectRepository(UserRepository)
    private readonly userRepository: UserRepository,
    @Inject('ENCRYPT_PROVIDER')
    private readonly encryption: BcryptProvider,
    @Inject('CRYPTO_PROVIDER')
    private readonly crypto: CryptoProvider,
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
    this.handleRawKeys(response, 'fullName', 'full_name');
    return this.crypto.decryptUser(response);
  }

  // =========================================================================================
  // PRIVATE METHODS
  // =========================================================================================
  private handleRawKeys(object, newKey: string, oldKey: string) {
    Object.defineProperty(
      object,
      newKey,
      Object.getOwnPropertyDescriptor(object, oldKey),
    );
    delete object[oldKey];
  }
}
