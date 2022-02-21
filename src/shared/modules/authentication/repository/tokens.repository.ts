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

  async deleteTokens(userID: string): Promise<JwtToken | undefined> {
    try {
      const response = await this.createQueryBuilder('jwt_tokens')
        .update<JwtToken>(JwtToken, { jwtToken: null, refreshToken: null })
        .where('userID = :userID', { userID })
        .returning('user_id, jwt_token, refresh_token')
        .updateEntity(true)
        .execute();
      return response.raw[0];
    } catch (error) {
      throw new ConflictException(unexpected(error.message));
    }
  }

  async saveTokens(
    saveJwtTokenDTO: SaveJwtTokenDTO,
  ): Promise<JwtToken | undefined> {
    try {
      const tokens = this.create(saveJwtTokenDTO);
      return await this.save(tokens);
    } catch (error) {
      throw new ConflictException(unexpected(error.message));
    }
  }

  async updateJwtToken(
    id: string,
    jwtToken: string,
  ): Promise<string | undefined> {
    try {
      const response = await this.createQueryBuilder('jwt_tokens')
        .update<JwtToken>(JwtToken, { jwtToken })
        .where('userID = :id', { id })
        .returning('jwt_token')
        .updateEntity(true)
        .execute();
      return response.raw[0];
    } catch (error) {
      throw new ConflictException(unexpected(error.message));
    }
  }
}
