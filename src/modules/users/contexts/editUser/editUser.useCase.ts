import { Injectable, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { EditUserRequestBodyDTO } from '@shared/dtos/user/editUserRequestBody.dto';
import { User } from '@shared/entities/user/user.entity';
import { UserRepository } from '@modules/users/repository/user.repository';

import { CryptoProvider } from '@shared/providers/EncryptProvider/crypto.provider';

@Injectable()
export class EditUserUseCase {
  constructor(
    @InjectRepository(UserRepository)
    private readonly userRepository: UserRepository,
    @Inject('CRYPTO_PROVIDER')
    private readonly crypto: CryptoProvider,
  ) {}

  async execute(
    userId: string,
    newUserData: EditUserRequestBodyDTO,
  ): Promise<User> {
    const encryptedNewUserData = {};
    Object.keys(newUserData).forEach((key) => {
      encryptedNewUserData[key] = this.crypto.encrypt(newUserData[key]);
    });
    const user = await this.userRepository.editUserById(
      userId,
      encryptedNewUserData,
    );
    this.handleRawKeys(user, 'fullName', 'full_name');
    return this.crypto.decryptUser(user);
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
