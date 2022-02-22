import {
  ConflictException,
  Injectable,
  Inject,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { notFound } from '@shared/constants/errors';

import { User } from '@shared/entities/user/user.entity';
import { UserRepository } from '@modules/users/repository/user.repository';

import { CryptoProvider } from '@shared/providers/EncryptProvider/crypto.provider';
import { BcryptProvider } from '@shared/providers/EncryptProvider/bcrypt.provider';

@Injectable()
export class FindUserUseCase {
  constructor(
    @InjectRepository(UserRepository)
    private readonly userRepository: UserRepository,
    @Inject('ENCRYPT_PROVIDER')
    private readonly encryption: BcryptProvider,
    @Inject('CRYPTO_PROVIDER')
    private readonly crypto: CryptoProvider,
  ) {}

  async findUserById(
    adminID: string,
    password: string,
    userID: string,
  ): Promise<User> {
    await this.checkAdminCredentials(adminID, password);

    const user = await this.userRepository.findUserById(userID);

    if (!user) {
      throw new ConflictException(notFound('User'));
    }

    return this.crypto.decryptUser(user);
  }

  async findUserByEmail(
    adminID: string,
    password: string,
    email: string,
  ): Promise<User> {
    await this.checkAdminCredentials(adminID, password);

    const user = await this.userRepository.findUserByEmail(email);

    if (!user) {
      throw new ConflictException(notFound('User'));
    }

    return this.crypto.decryptUser(user);
  }

  async getAllUsers(): Promise<User[]> {
    const users = await this.userRepository.getAllUsers();
    return users;
  }

  // =========================================================================================
  // PRIVATE METHODS
  // =========================================================================================
  private async checkAdminCredentials(
    adminID: string,
    password: string,
  ): Promise<void> {
    const admin = await this.userRepository.findUserById(adminID);
    const validPassword = await this.encryption.compareHash(
      password,
      admin.password,
    );
    if (!validPassword) {
      throw new UnauthorizedException();
    }
  }
}
