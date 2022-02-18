import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { JwtToken } from '@shared/entities/jwtToken/jwtToken.entity';

import { SaveJwtTokenDTO } from '@shared/dtos/jwtToken/saveJwtToken.dto';
import { TokensRepository } from '@shared/modules/authentication/repository/tokens.repository';

@Injectable()
export class TokensService {
  constructor(
    @InjectRepository(TokensRepository)
    private tokensRepository: TokensRepository,
  ) {}

  async findJwtTokenById(id: string): Promise<string> {
    const jwtToken = await this.tokensRepository.findTokensByUserId(id);
    if (!jwtToken.jwtToken) {
      throw new UnauthorizedException();
    }
    return jwtToken.jwtToken;
  }

  async findRefreshTokenById(id: string): Promise<string> {
    const jwtToken = await this.tokensRepository.findTokensByUserId(id);
    if (!jwtToken.refreshToken) {
      throw new UnauthorizedException();
    }
    return jwtToken.refreshToken;
  }

  async saveToken(saveJwtTokenDTO: SaveJwtTokenDTO): Promise<void> {
    await this.tokensRepository.saveToken(saveJwtTokenDTO);
  }

  async deleteJwtToken(userID: string): Promise<JwtToken | undefined> {
    return await this.tokensRepository.deleteJwtToken(userID);
  }

  async deleteRefreshToken(userID: string): Promise<JwtToken | undefined> {
    return await this.tokensRepository.deleteRefreshToken(userID);
  }

  async updateJwtToken(
    userID: string,
    jwtToken: string,
  ): Promise<string | undefined> {
    return await this.tokensRepository.updateJwtToken(userID, jwtToken);
  }
}
