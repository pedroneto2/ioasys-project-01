import { Injectable } from '@nestjs/common';

import { EditUserRequestBodyDTO } from '@shared/dtos/user/editUserRequestBody.dto';
import { User } from '@shared/entities/user/user.entity';
import { UserRepository } from '@modules/users/repository/user.repository';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class EditUserUseCase {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
  ) {}

  async execute(
    userId: string,
    newUserData: EditUserRequestBodyDTO,
  ): Promise<User> {
    const user = await this.userRepository.editUser(userId, newUserData);
    return user;
  }
}
