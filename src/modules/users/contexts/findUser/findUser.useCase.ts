import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { notFound } from '@shared/constants/errors';

import { User } from '@shared/entities/user/user.entity';
import { UserRepository } from '@modules/users/repository/user.repository';

@Injectable()
export class FindUserUseCase {
  constructor(
    @InjectRepository(UserRepository)
    private readonly userRepository: UserRepository,
  ) {}

  async findUserById(id: string): Promise<User> {
    const user = await this.userRepository.findUserById(id);

    if (!user) {
      throw new ConflictException(notFound('User'));
    }
    return user;
  }

  async findUserByEmail(email: string): Promise<User> {
    const user = await this.userRepository.findUserByEmail(email);

    if (!user) {
      throw new ConflictException(notFound('User'));
    }
    return user;
  }

  async getAllUsers(): Promise<User[]> {
    const users = await this.userRepository.getAllUsers();
    return users;
  }
}
