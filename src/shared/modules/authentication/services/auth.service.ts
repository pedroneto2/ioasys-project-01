import { Injectable, Inject } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import envVariables from '@config/env';

import { FindUserUseCase } from '@modules/users/contexts/findUser/findUser.useCase';
import { BcryptProvider } from '@shared/providers/EncryptProvider/bcrypt.provider';
import { User } from '@shared/entities/user/user.entity';
import { TokensService } from '@shared/modules/authentication/services/tokens.service';
import { PayloadDTO } from '@shared/dtos/authentication/payload.dto';
import { LoginResponseDTO } from '@shared/dtos/authentication/loginResponse.dto';

@Injectable()
export class AuthService {
  constructor(
    private findUserUseCase: FindUserUseCase,
    @Inject('ENCRYPT_PROVIDER')
    private encryption: BcryptProvider,
    private jwtService: JwtService,
    private tokensService: TokensService,
  ) {}

  async validateUser(email: string, password: string): Promise<User | null> {
    const user = await this.findUserUseCase.findUserByEmail(email);

    const validPassword = await this.encryption.compareHash(
      password,
      user.password,
    );

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

    await this.tokensService.saveToken({
      userID: user.id,
      jwtToken: hashedAccessToken,
      refreshToken: hashedRefresToken,
    });

    return { accessCookie, refreshCookie };
  }

  async refresh(user: User): Promise<string> {
    const payload = {
      userID: user.id,
      email: user.email,
      isAdmin: user.admin,
    };
    const { accessCookie, accessToken } = await this.getAccessCookie(payload);

    const hashedAccessToken = this.encryption.createHash(accessToken);

    await this.tokensService.updateJwtToken(user.id, hashedAccessToken);

    return accessCookie;
  }

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
}
