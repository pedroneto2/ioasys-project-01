import { EntityRepository, Repository } from 'typeorm';
import { ConflictException } from '@nestjs/common';

import { CreateUserDTO } from '@shared/dtos/user/createUser.dto';
import { EditUserDTO } from '@shared/dtos/user/editUser.dto';
import { User } from '@shared/entities/user/user.entity';
import { notFound, unexpected } from '@shared/constants/errors';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async findUserByEmail(email: string): Promise<User | undefined> {
    try {
      return await this.findOne({ email });
    } catch (error) {
      throw new ConflictException(unexpected(error.message));
    }
  }

  async findUserById(id: string): Promise<User | undefined> {
    try {
      return await this.findOne(id);
    } catch (error) {
      throw new ConflictException(unexpected(error.message));
    }
  }

  async getAllUsers(): Promise<User[]> {
    try {
      return await this.find({
        select: [
          'id',
          'email',
          'admin',
          'active',
          'createdAt',
          'updatedAt',
          'deletedAt',
        ],
      });
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

  async deleteUserById(id: string): Promise<User | undefined> {
    try {
      const response = await this.createQueryBuilder()
        .softDelete()
        .from(User)
        .where('id = :id', { id })
        .returning('full_name, cpf, email')
        .execute();
      return response.raw[0];
    } catch (error) {
      throw new ConflictException(unexpected(error.message));
    }
  }

  async editUserById(userID: string, newUserData: EditUserDTO): Promise<User> {
    try {
      const updatedData = await this.createQueryBuilder('users')
        .update<User>(User, { ...newUserData })
        .where('id = :userID', { userID })
        .returning('full_name, cpf, email')
        .updateEntity(true)
        .execute();
      return updatedData.raw[0];
    } catch (error) {
      throw new ConflictException(unexpected(error.message));
    }
  }

  async handleUserAdmin(userID: string, admin: boolean): Promise<User> {
    try {
      const updatedData = await this.createQueryBuilder('users')
        .update<User>(User, { admin: admin })
        .where('id = :userID', { userID })
        .returning('id, full_name, cpf, email, admin')
        .updateEntity(true)
        .execute();
      return updatedData.raw[0];
    } catch (error) {
      throw new ConflictException(unexpected(error.message));
    }
  }

  async removeDefaultAddress(userID: string): Promise<void> {
    try {
      await this.createQueryBuilder('users')
        .update<User>(User, {
          defaultAddressID: null,
        })
        .where('id = :userID', { userID })
        .execute();
    } catch (error) {
      throw new ConflictException(unexpected(error.message));
    }
  }

  async setDefaultAddress(addressID: string, userID: string): Promise<void> {
    try {
      await this.createQueryBuilder('users')
        .update<User>(User, {
          defaultAddressID: addressID,
        })
        .where('id = :userID', { userID })
        .execute();
    } catch (error) {
      if (/violates foreign key/gi.test(error.message)) {
        throw new ConflictException(notFound('Address'));
      }
      throw new ConflictException(unexpected(error.message));
    }
  }

  async getCheckOutData(userID: string): Promise<User> {
    try {
      // const user = await this.createQueryBuilder('users')
      //   .leftJoin('users.defaultAddressID', 'address')
      //   .where('users.id = :userID', { userID })
      //   .select(['users.fullName, users.cpf, address.id'])
      //   .getOne();
      const user = await this.findOne({
        where: { id: userID },
        select: ['fullName', 'cpf', 'defaultAddressID'],
      });
      return user;
    } catch (error) {
      throw new ConflictException(unexpected(error.message));
    }
  }
}
