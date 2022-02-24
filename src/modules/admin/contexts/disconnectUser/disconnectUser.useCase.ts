import { Injectable, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { TokensRepository } from '@shared/modules/authentication/repository/tokens.repository';

import { notFound } from '@shared/constants/errors';

@Injectable()
export class DisconnectUserUseCase {
  constructor(
    @InjectRepository(TokensRepository)
    private readonly tokensRepository: TokensRepository,
  ) {}

  async execute(userID: string): Promise<boolean> {
    const response = await this.tokensRepository.deleteTokens(userID);
    if (!response) {
      throw new ConflictException(notFound('User'));
    }
    return true;
  }
}
