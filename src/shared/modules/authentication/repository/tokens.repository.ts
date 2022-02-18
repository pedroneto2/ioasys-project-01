import { EntityRepository, Repository } from 'typeorm';
import { ConflictException, UnauthorizedException } from '@nestjs/common';

import { JwtToken } from '@shared/entities/jwtToken/jwtToken.entity';
import { SaveJwtTokenDTO } from '@shared/dtos/jwtToken/saveJwtToken.dto';
import { unexpected } from '@shared/constants/errors';

@EntityRepository(JwtToken)
export class TokensRepository extends Repository<JwtToken> {
  async findTokensByUserId(id: string): Promise<JwtToken | undefined> {
    try {
      return await this.findOne(id);
    } catch (error) {
      throw new UnauthorizedException();
    }
  }

  async deleteJwtToken(id: string): Promise<JwtToken | undefined> {
    try {
      const response = await this.createQueryBuilder()
        .update<JwtToken>(JwtToken, { jwtToken: null })
        .where('user_id = :id', { id })
        .returning('user_id, JWT_TOKEN, REFRESH_TOKEN')
        .execute();
      return response.raw[0];
    } catch (error) {
      throw new ConflictException(unexpected(error.message));
    }
  }

  async deleteRefreshToken(id: string): Promise<JwtToken | undefined> {
    try {
      const response = await this.createQueryBuilder()
        .update<JwtToken>(JwtToken, { refreshToken: null })
        .where('user_id = :id', { id })
        .returning('user_id, JWT_TOKEN, REFRESH_TOKEN')
        .execute();
      return response.raw[0];
    } catch (error) {
      throw new ConflictException(unexpected(error.message));
    }
  }

  async saveToken(saveJwtTokenDTO: SaveJwtTokenDTO): Promise<void> {
    try {
      const tokens = this.create(saveJwtTokenDTO);
      await this.save(tokens);
    } catch (error) {
      throw new ConflictException(unexpected(error.message));
    }
  }

  async updateJwtToken(
    id: string,
    jwtToken: string,
  ): Promise<string | undefined> {
    try {
      const response = await this.createQueryBuilder()
        .update<JwtToken>(JwtToken, { jwtToken })
        .where('user_id = :id', { id })
        .returning('JWT_TOKEN')
        .execute();
      return response.raw[0];
    } catch (error) {
      throw new ConflictException(unexpected(error.message));
    }
  }
}
