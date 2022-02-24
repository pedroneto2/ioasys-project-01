import {
  Injectable,
  Inject,
  UnauthorizedException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { BcryptProvider } from '@shared/providers/EncryptProvider/bcrypt.provider';
import { CryptoProvider } from '@shared/providers/EncryptProvider/crypto.provider';

import { TokensRepository } from '@shared/modules/authentication/repository/tokens.repository';
import { UserRepository } from '@modules/users/repository/user.repository';

import { User } from '@shared/entities/user/user.entity';
import { requestNotCompleted } from '@shared/constants/errors';

@Injectable()
export class HandleUserAdminUseCase {
  constructor(
    @InjectRepository(UserRepository)
    private readonly userRepository: UserRepository,
    @InjectRepository(TokensRepository)
    private readonly tokensRepository: TokensRepository,
    @Inject('ENCRYPT_PROVIDER')
    private readonly encryption: BcryptProvider,
    @Inject('CRYPTO_PROVIDER')
    private readonly crypto: CryptoProvider,
  ) {}

  async convertUserToAdmin(
    adminID: string,
    userID: string,
    password: string,
    isAdmin: boolean,
  ): Promise<User> {
    const admin = await this.userRepository.findUserById(adminID);
    const validPassword = await this.encryption.compareHash(
      password,
      admin.password,
    );
    if (!validPassword) {
      throw new UnauthorizedException();
    }
    const user = await this.userRepository.handleUserAdmin(userID, isAdmin);
    if (!user) {
      throw new ConflictException(
        requestNotCompleted('handleUserAdmin:handleUserAdmin'),
      );
    }

    if (!isAdmin) {
      // disconnect user if change his admin status to false
      const response = await this.tokensRepository.deleteTokens(userID);
      if (!response) {
        throw new ConflictException(
          requestNotCompleted('deleteTokens:handleUserAdmin'),
        );
      }
    }
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
