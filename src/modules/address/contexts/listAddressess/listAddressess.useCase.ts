import { Injectable, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Address } from '@shared/entities/addressess/address.entity';
import { AddressRepository } from '@modules/address/repository/address.repository';

import { CryptoProvider } from '@shared/providers/EncryptProvider/crypto.provider';

@Injectable()
export class ListAddressessUseCase {
  constructor(
    @InjectRepository(AddressRepository)
    private readonly addressRepository: AddressRepository,
    @Inject('CRYPTO_PROVIDER')
    private readonly crypto: CryptoProvider,
  ) {}

  async listAddressess(userID: string): Promise<Address[]> {
    const addresses = await this.addressRepository.listAddressess(userID);
    return addresses.map((address) => this.crypto.decryptAddress(address));
  }
}
