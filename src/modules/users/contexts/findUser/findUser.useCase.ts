import { ConflictException, Injectable } from '@nestjs/common';

import { notFound } from '@shared/constants/errors';

import { User } from '@shared/entities/user/user.entity';
import { UserRepository } from '@modules/users/repository/user.repository';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class FindUserUseCase {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
  ) {}

  async findOne(id?: string, email?: string): Promise<User> {
    const user =
      (await this.userRepository.findById(id)) ||
      (await this.userRepository.findByEmail(email));

    if (!user) {
      throw new ConflictException(notFound('User'));
    }
    return user;
  }

  async getAll(): Promise<User[]> {
    const users = await this.userRepository.getAll();
    return users;
  }
}
