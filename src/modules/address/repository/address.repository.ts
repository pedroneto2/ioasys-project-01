import { EntityRepository, Repository } from 'typeorm';
import { ConflictException } from '@nestjs/common';

import { EditAddressDTO } from '@shared/dtos/address/editAddress.dto';
import { Address } from '@shared/entities/addressess/address.entity';
import { dataInUsage, unexpected } from '@shared/constants/errors';

@EntityRepository(Address)
export class AddressRepository extends Repository<Address> {
  async createAddress(address: Address): Promise<Address> {
    try {
      const newAddress = this.create(address);
      return await this.save(newAddress);
    } catch (error) {
      throw new ConflictException(unexpected(error.message));
    }
  }

  async editAddress(
    userID: string,
    addressID: string,
    editAddressDTO: EditAddressDTO,
  ): Promise<Address> {
    try {
      const response = await this.createQueryBuilder('addressess')
        .update<Address>(Address, { ...editAddressDTO })
        .where('id = :addressID', { addressID })
        .andWhere('userID = :userID', { userID })
        .returning('*')
        .updateEntity(true)
        .execute();
      return response.raw[0];
    } catch (error) {
      throw new ConflictException(unexpected(error.message));
    }
  }

  async deleteAddress(addressID: string, userID: string): Promise<Address> {
    try {
      const response = await this.createQueryBuilder('addressess')
        .delete()
        .from(Address)
        .where('id = :addressID', { addressID })
        .andWhere('userID = :userID', { userID })
        .returning('*')
        .execute();
      return response.raw[0];
    } catch (error) {
      if (/violates foreign key/gi.test(error.message)) {
        throw new ConflictException(dataInUsage('Address'));
      }
      throw new ConflictException(unexpected(error.message));
    }
  }

  async listAddressess(userID: string): Promise<Address[]> {
    try {
      return await this.find({ where: { userID } });
    } catch (error) {
      throw new ConflictException(unexpected(error.message));
    }
  }

  async getAddress(userID: string, addressID: string): Promise<Address> {
    try {
      return await this.findOne({ where: { id: addressID, userID } });
    } catch (error) {
      throw new ConflictException(unexpected(error.message));
    }
  }
}
