import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CryptoProvider } from '@shared/providers/EncryptProvider/crypto.provider';
import { CrudAddressUseCase } from '@modules/address/contexts/crudAddress/crudAddress.useCase';
import { ListAddressessUseCase } from '@modules/address/contexts/listAddressess/listAddressess.useCase';

import { CrudAddressController } from '@modules/address/contexts/crudAddress/crudAddress.controller';
import { ListAddressessController } from '@modules/address/contexts/listAddressess/listAddressess.controller';

import { AddressRepository } from '@modules/address/repository/address.repository';

@Module({
  imports: [TypeOrmModule.forFeature([AddressRepository]), CryptoProvider],
  providers: [
    { provide: 'CRYPTO_PROVIDER', useClass: CryptoProvider },
    CrudAddressUseCase,
    ListAddressessUseCase,
  ],
  controllers: [CrudAddressController, ListAddressessController],
})
export class AddressModule {}
