import { ConflictException, Injectable, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { v4 as uuidV4 } from 'uuid';

import { EditAddressDTO } from '@shared/dtos/address/editAddress.dto';
import { CreateAddressDTO } from '@shared/dtos/address/createAddress.dto';
import { Address } from '@shared/entities/addressess/address.entity';
import { AddressRepository } from '@modules/address/repository/address.repository';

import { CryptoProvider } from '@shared/providers/EncryptProvider/crypto.provider';
import { notFound, unexpected } from '@shared/constants/errors';

@Injectable()
export class CrudAddressUseCase {
  constructor(
    @InjectRepository(AddressRepository)
    private readonly addressRepository: AddressRepository,
    @Inject('CRYPTO_PROVIDER')
    private readonly crypto: CryptoProvider,
  ) {}

  async createAddress({
    userID,
    address,
    state,
    zipCode,
  }: CreateAddressDTO): Promise<Address> {
    const newAddress = await this.addressRepository.createAddress({
      id: uuidV4(),
      userID,
      address: this.crypto.encrypt(address),
      state: this.crypto.encrypt(state),
      zipCode: this.crypto.encrypt(zipCode),
    });
    if (!newAddress) {
      throw new ConflictException(
        unexpected('createAddress:createAddressUseCase'),
      );
    }
    return this.crypto.decryptAddress(newAddress);
  }

  async editAddress(
    userID: string,
    addressID: string,
    editAddressDTO: EditAddressDTO,
  ): Promise<Address> {
    const ecryptedEditAddressDTO = {};
    Object.keys(editAddressDTO).forEach((key) => {
      ecryptedEditAddressDTO[key] = this.crypto.encrypt(editAddressDTO[key]);
    });
    const editedAddress = await this.addressRepository.editAddress(
      userID,
      addressID,
      ecryptedEditAddressDTO,
    );
    if (!editedAddress) {
      throw new ConflictException(notFound('Address'));
    }
    this.handleRawKeys(editedAddress, 'zipCode', 'zip_code');
    return this.crypto.decryptAddress(editedAddress);
  }

  async deleteAddress(
    addressID: string,
    userID: string,
  ): Promise<Address | undefined> {
    const deletedAddress = await this.addressRepository.deleteAddress(
      addressID,
      userID,
    );
    if (!deletedAddress) {
      throw new ConflictException(notFound('Address'));
    }
    this.handleRawKeys(deletedAddress, 'zipCode', 'zip_code');
    return this.crypto.decryptAddress(deletedAddress);
  }

  // =========================================================================================
  // PRIVATE METHODS
  // =========================================================================================
  private handleRawKeys(object, newKey: string, oldKey: string) {
    Object.defineProperty(
      object,
      newKey,
      Object.getOwnPropertyDescriptor(object, oldKey),
    );
    delete object[oldKey];
  }
}
