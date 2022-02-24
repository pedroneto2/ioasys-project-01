import { Injectable, Inject, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import envVariables from '@config/env';

import { User } from '@shared/entities/user/user.entity';
import { PayloadDTO } from '@shared/dtos/authentication/payload.dto';
import { LoginResponseDTO } from '@shared/dtos/authentication/loginResponse.dto';

import { requestNotCompleted } from '@shared/constants/errors';

import { BcryptProvider } from '@shared/providers/EncryptProvider/bcrypt.provider';
import { CryptoProvider } from '@shared/providers/EncryptProvider/crypto.provider';

import { TokensRepository } from '@shared/modules/authentication/repository/tokens.repository';
import { UserRepository } from '@modules/users/repository/user.repository';

@Injectable()
export class AuthService {
  constructor(
    @Inject('ENCRYPT_PROVIDER')
    private readonly encryption: BcryptProvider,
    @Inject('CRYPTO_PROVIDER')
    private readonly crypto: CryptoProvider,
    private readonly jwtService: JwtService,
    @InjectRepository(TokensRepository)
    private readonly tokensRepository: TokensRepository,
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
  ) {}

  async validateUser(email: string, password: string): Promise<User | null> {
    const encryptedEmail = this.crypto.encrypt(email);
    const user = await this.userRepository.findUserByEmail(encryptedEmail);

    let validPassword: boolean;

    if (user) {
      validPassword = await this.encryption.compareHash(
        password,
        user.password,
      );
    }

    if (user && validPassword) {
      return user;
    }
    return null;
  }

  async login(user: User): Promise<LoginResponseDTO> {
    const payload = {
      userID: user.id,
      email: user.email,
      isAdmin: user.admin,
    };

    const { accessCookie, accessToken } = await this.getAccessCookie(payload);
    const { refreshCookie, refreshToken } = await this.getRefreshCookie(
      payload,
    );

    const hashedAccessToken = this.encryption.createHash(accessToken);
    const hashedRefresToken = this.encryption.createHash(refreshToken);

    const response = await this.tokensRepository.saveTokens({
      userID: user.id,
      jwtToken: hashedAccessToken,
      refreshToken: hashedRefresToken,
    });

    if (!response) {
      throw new ConflictException(
        requestNotCompleted('saveTokens:auth.service'),
      );
    }

    return { accessCookie, refreshCookie };
  }

  logout(): string[] {
    return this.getLogOutCookie();
  }

  async refresh(payload: PayloadDTO): Promise<string> {
    const { accessCookie, accessToken } = await this.getAccessCookie(payload);

    const hashedAccessToken = this.encryption.createHash(accessToken);

    const response = await this.tokensRepository.updateJwtToken(
      payload.userID,
      hashedAccessToken,
    );

    if (!response) {
      throw new ConflictException(
        requestNotCompleted('updateJwtToken:auth.service'),
      );
    }

    return accessCookie;
  }

  async removeTokensFromUser(userID: string): Promise<void> {
    const response = await this.tokensRepository.deleteTokens(userID);
    if (!response) {
      throw new ConflictException(
        requestNotCompleted('removeTokensFromUser:auth.service'),
      );
    }
  }

  // =========================================================================================
  // PRIVATE METHODS
  // =========================================================================================
  private async getAccessCookie({ userID, email, isAdmin }: PayloadDTO) {
    const payload = { userID, email, isAdmin };
    const expirationTime = envVariables().expiresIn;
    const accessToken = this.jwtService.sign(payload, {
      secret: envVariables().jwtSecret,
      expiresIn: expirationTime,
    });
    const accessCookie = `Authentication=${accessToken}; HttpOnly; Path=/; Max-Age=${expirationTime}`;
    return { accessCookie, accessToken };
  }

  private async getRefreshCookie({ userID, email, isAdmin }: PayloadDTO) {
    const payload = { userID, email, isAdmin };
    const expirationTime = envVariables().refreshExpiresIn;
    const refreshToken = this.jwtService.sign(payload, {
      secret: envVariables().refreshSecret,
      expiresIn: expirationTime,
    });
    const refreshCookie = `Refresh=${refreshToken}; HttpOnly; Path=/; Max-Age=${expirationTime}`;
    return { refreshCookie, refreshToken };
  }

  private getLogOutCookie(): string[] {
    return [
      'Authentication=; HttpOnly; Path=/; Max-Age=0',
      'Refresh=; HttpOnly; Path=/; Max-Age=0',
    ];
  }
}
