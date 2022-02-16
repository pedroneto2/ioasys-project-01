import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { BcryptProvider } from '@shared/providers/EncryptProvider/bcrypt.provider';

import { CreateUserController } from '@modules/users/contexts/createUser/createUser.controller';
import { FindUserController } from '@modules/users/contexts/findUser/findUser.controller';
import { EditUserController } from '@modules/users/contexts/editUser/editUser.controller';
import { DeleteUserController } from '@modules/users/contexts/deleteUser/deletedUser.controller';
import { CreateUserUseCase } from '@modules/users/contexts/createUser/createUser.useCase';
import { FindUserUseCase } from '@modules/users/contexts/findUser/findUser.useCase';
import { UserRepository } from '@modules/users/repository/user.repository';
import { EditUserUseCase } from '@modules/users/contexts/editUser/editUser.useCase';
import { DeleteUserUseCase } from '@modules/users/contexts/deleteUser/deleteUser.useCase';

@Module({
  imports: [TypeOrmModule.forFeature([UserRepository]), BcryptProvider],
  providers: [
    { provide: 'ENCRYPT_PROVIDER', useClass: BcryptProvider },
    CreateUserUseCase,
    FindUserUseCase,
    EditUserUseCase,
    DeleteUserUseCase,
  ],
  controllers: [
    CreateUserController,
    FindUserController,
    EditUserController,
    DeleteUserController,
  ],
})
export class UserModule {}
