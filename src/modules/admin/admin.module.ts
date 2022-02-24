import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { BcryptProvider } from '@shared/providers/EncryptProvider/bcrypt.provider';
import { CryptoProvider } from '@shared/providers/EncryptProvider/crypto.provider';

import { ConvertUserToAdminUserController } from '@modules/admin/contexts/handleUserAdmin/handleUserAdmin.controller';
import { DisconnectUserController } from '@modules/admin/contexts/disconnectUser/disconnectUser.controller';

import { UserRepository } from '@modules/users/repository/user.repository';
import { TokensRepository } from '@shared/modules/authentication/repository/tokens.repository';

import { HandleUserAdminUseCase } from '@modules/admin/contexts/handleUserAdmin/handleUserAdmin.useCase';
import { DisconnectUserUseCase } from '@modules/admin/contexts/disconnectUser/disconnectUser.useCase';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserRepository, TokensRepository]),
    BcryptProvider,
  ],
  providers: [
    { provide: 'ENCRYPT_PROVIDER', useClass: BcryptProvider },
    { provide: 'CRYPTO_PROVIDER', useClass: CryptoProvider },
    HandleUserAdminUseCase,
    DisconnectUserUseCase,
  ],
  controllers: [ConvertUserToAdminUserController, DisconnectUserController],
})
export class AdminModule {}
