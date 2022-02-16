import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityRepository, Repository } from 'typeorm';

import { CreateUserDTO } from '@shared/dtos/user/createUser.dto';
import { EditUserDTO } from '@shared/dtos/user/editUser.dto';
import { User } from '@shared/entities/user/user.entity';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async findByEmail(email: string): Promise<User | undefined> {
    return await this.findOne({ email });
  }

  async findById(id: string): Promise<User | undefined> {
    return await this.findOne(id);
  }

  async getAll(): Promise<User[]> {
    return await this.find();
  }

  async createUser(createUserDTO: CreateUserDTO): Promise<User> {
    const user = this.create(createUserDTO);
    return this.save(user);
  }

  async editUser(userId: string, newUserData: EditUserDTO): Promise<User> {
    const updatedData = await this.createQueryBuilder('users')
      .update<User>(User, { ...newUserData })
      .where('id = :id', { id: userId })
      .returning('full_name, cpf, email, address, state, zip_code')
      .updateEntity(true)
      .execute();
    return updatedData.raw[0];
  }
}
