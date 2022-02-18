import {
  Injectable,
  UnauthorizedException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { SaveJwtTokenDTO } from '@shared/dtos/jwtToken/saveJwtToken.dto';
import { TokensRepository } from '@shared/modules/authentication/repository/tokens.repository';

import { requestNotCompleted } from '@shared/constants/errors';

@Injectable()
export class TokensService {
  constructor(
    @InjectRepository(TokensRepository)
    private readonly tokensRepository: TokensRepository,
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
    const response = this.tokensRepository.saveToken(saveJwtTokenDTO);
    if (!response) {
      throw new ConflictException(
        requestNotCompleted('updateJwtToken:tokens.service'),
      );
    }
  }

  async deleteJwtToken(userID: string): Promise<void> {
    const response = await this.tokensRepository.deleteJwtToken(userID);
    if (!response) {
      throw new ConflictException(
        requestNotCompleted('deleteJwtToken:tokens.service'),
      );
    }
  }

  async deleteRefreshToken(userID: string): Promise<void> {
    const response = await this.tokensRepository.deleteRefreshToken(userID);
    if (!response) {
      throw new ConflictException(
        requestNotCompleted('deleteRefreshToken:tokens.service'),
      );
    }
  }

  async updateJwtToken(userID: string, jwtToken: string): Promise<void> {
    const response = await this.tokensRepository.updateJwtToken(
      userID,
      jwtToken,
    );
    if (!response) {
      throw new ConflictException(
        requestNotCompleted('updateJwtToken:tokens.service'),
      );
    }
  }
}
