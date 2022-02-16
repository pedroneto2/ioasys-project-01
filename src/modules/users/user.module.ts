import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { BcryptProvider } from '@shared/providers/EncryptProvider/bcrypt.provider';

import { CreateUserController } from '@modules/users/contexts/createUser/createUser.controller';
import { FindUserController } from '@modules/users/contexts/findUser/findUser.controller';
import { CreateUserUseCase } from '@modules/users/contexts/createUser/createUser.useCase';
import { FindUserUseCase } from '@modules/users/contexts/findUser/findUser.useCase';
import { UserRepository } from '@modules/users/repository/user.repository';
import { EditUserController } from '@modules/users/contexts/editUser/editUser.controller';
import { EditUserUseCase } from '@modules/users/contexts/editUser/editUser.useCase';

@Module({
  imports: [TypeOrmModule.forFeature([UserRepository]), BcryptProvider],
  providers: [
    { provide: 'ENCRYPT_PROVIDER', useClass: BcryptProvider },
    CreateUserUseCase,
    FindUserUseCase,
    EditUserUseCase,
  ],
  controllers: [CreateUserController, FindUserController, EditUserController],
})
export class UserModule {}
