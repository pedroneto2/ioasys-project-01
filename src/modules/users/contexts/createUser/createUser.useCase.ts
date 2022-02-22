import { ConflictException, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { v4 as uuidV4 } from 'uuid';
import { BcryptProvider } from '@shared/providers/EncryptProvider/bcrypt.provider';
import { CryptoProvider } from '@shared/providers/EncryptProvider/crypto.provider';

import { alreadyExists } from '@shared/constants/errors';

import { CreateUserRequestBodyDTO } from '@shared/dtos/user/createUserRequestBody.dto';
import { User } from '@shared/entities/user/user.entity';
import { UserRepository } from '@modules/users/repository/user.repository';

@Injectable()
export class CreateUserUseCase {
  constructor(
    @InjectRepository(UserRepository)
    private readonly userRepository: UserRepository,
    @Inject('ENCRYPT_PROVIDER')
    private readonly encryption: BcryptProvider,
    @Inject('CRYPTO_PROVIDER')
    private readonly crypto: CryptoProvider,
  ) {}

  async execute({
    fullName,
    cpf,
    email,
    password,
    address,
    state,
    zipCode,
  }: CreateUserRequestBodyDTO): Promise<User> {
    const savedUser = await this.userRepository.findUserByEmail(email);

    if (savedUser) {
      throw new ConflictException(alreadyExists('email'));
    }

    const hashedPassword = this.encryption.createHash(password);

    const user = await this.userRepository.createUser({
      id: uuidV4(),
      fullName: this.crypto.encrypt(fullName),
      cpf: this.crypto.encrypt(cpf),
      email: email,
      password: hashedPassword,
      address: this.crypto.encrypt(address),
      state: this.crypto.encrypt(state),
      zipCode: this.crypto.encrypt(zipCode),
    });

    return this.crypto.decryptUser(user);
  }
}
