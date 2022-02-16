import { EntityRepository, Repository } from 'typeorm';
import { ConflictException } from '@nestjs/common';

import { CreateUserDTO } from '@shared/dtos/user/createUser.dto';
import { EditUserDTO } from '@shared/dtos/user/editUser.dto';
import { User } from '@shared/entities/user/user.entity';
import { unexpected } from '@shared/constants/errors';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async findByEmail(email: string): Promise<User | undefined> {
    try {
      return await this.findOne({ email });
    } catch (error) {
      throw new ConflictException(unexpected(error.message));
    }
  }

  async findById(id: string): Promise<User | undefined> {
    try {
      return await this.findOne(id);
    } catch (error) {
      throw new ConflictException(unexpected(error.message));
    }
  }

  async getAll(): Promise<User[]> {
    try {
      return await this.find();
    } catch (error) {
      throw new ConflictException(unexpected(error.message));
    }
  }

  async createUser(createUserDTO: CreateUserDTO): Promise<User> {
    try {
      const user = this.create(createUserDTO);
      return await this.save(user);
    } catch (error) {
      throw new ConflictException(unexpected(error.message));
    }
  }

  async deleteUser(id: string): Promise<boolean> {
    try {
      await this.createQueryBuilder()
        .softDelete()
        .from(User)
        .where('id = :id', { id })
        .execute();
      return true;
    } catch (error) {
      throw new ConflictException(unexpected(error.message));
    }
  }

  async editUser(userId: string, newUserData: EditUserDTO): Promise<User> {
    try {
      const updatedData = await this.createQueryBuilder('users')
        .update<User>(User, { ...newUserData })
        .where('id = :id', { id: userId })
        .returning('full_name, cpf, email, address, state, zip_code')
        .updateEntity(true)
        .execute();
      return updatedData.raw[0];
    } catch (error) {
      throw new ConflictException(unexpected(error.message));
    }
  }
}
