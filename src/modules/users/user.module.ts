import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { BcryptProvider } from '@shared/providers/EncryptProvider/bcrypt.provider';
import { CryptoProvider } from '@shared/providers/EncryptProvider/crypto.provider';

import { CreateUserController } from '@modules/users/contexts/createUser/createUser.controller';
import { FindUserController } from '@modules/users/contexts/findUser/findUser.controller';
import { EditUserController } from '@modules/users/contexts/editUser/editUser.controller';
import { DeleteUserController } from '@modules/users/contexts/deleteUser/deletedUser.controller';
import { SetDefaultAddressController } from '@modules/users/contexts/setDefaultAddress/setDefaultAddress.controller';

import { CreateUserUseCase } from '@modules/users/contexts/createUser/createUser.useCase';
import { FindUserUseCase } from '@modules/users/contexts/findUser/findUser.useCase';
import { UserRepository } from '@modules/users/repository/user.repository';
import { EditUserUseCase } from '@modules/users/contexts/editUser/editUser.useCase';
import { DeleteUserUseCase } from '@modules/users/contexts/deleteUser/deleteUser.useCase';
import { SetDefaultAddressUseCase } from '@modules/users/contexts/setDefaultAddress/setDefaultAddress.useCase';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserRepository]),
    BcryptProvider,
    CryptoProvider,
  ],
  providers: [
    { provide: 'ENCRYPT_PROVIDER', useClass: BcryptProvider },
    { provide: 'CRYPTO_PROVIDER', useClass: CryptoProvider },
    CreateUserUseCase,
    FindUserUseCase,
    EditUserUseCase,
    DeleteUserUseCase,
    SetDefaultAddressUseCase,
  ],
  controllers: [
    CreateUserController,
    FindUserController,
    EditUserController,
    DeleteUserController,
    SetDefaultAddressController,
  ],
})
export class UserModule {}
