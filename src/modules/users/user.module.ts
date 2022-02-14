import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { BcryptProvider } from '@shared/providers/EncryptProvider/bcrypt.provider';

import { CreateUserController } from '@modules/users/contexts/createUser/createUser.controller';
import { FindUserController } from '@modules/users/contexts/findUser/findUser.controller';
import { AuthenticateUser } from '@modules/users/contexts/authenticateUser/authenticateUser.controller';
import { AuthenticateUserUseCase } from '@modules/users/contexts/authenticateUser/authenticateUser.useCase';
import { LocalStrategy } from '@modules/users/contexts/authenticateUser/local.strategy';
import { CreateUserUseCase } from '@modules/users/contexts/createUser/createUser.useCase';
import { FindUserUseCase } from '@modules/users/contexts/findUser/findUser.useCase';
import { UserRepository } from '@modules/users/repository/user.repository';

@Module({
  imports: [TypeOrmModule.forFeature([UserRepository]), BcryptProvider],
  providers: [
    { provide: 'ENCRYPT_PROVIDER', useClass: BcryptProvider },
    CreateUserUseCase,
    FindUserUseCase,
    AuthenticateUserUseCase,
    LocalStrategy,
  ],
  controllers: [CreateUserController, FindUserController, AuthenticateUser],
})
export class UserModule {}
