import { Injectable, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { TokensRepository } from '@shared/modules/authentication/repository/tokens.repository';

import { requestNotCompleted } from '@shared/constants/errors';

@Injectable()
export class DisconnectUserUseCase {
  constructor(
    @InjectRepository(TokensRepository)
    private readonly tokensRepository: TokensRepository,
  ) {}

  async execute(userID: string): Promise<boolean> {
    const response = await this.tokensRepository.deleteTokens(userID);
    if (!response) {
      throw new ConflictException(
        requestNotCompleted('execute:disconnectUserUseCase'),
      );
    }
    return true;
  }
}
