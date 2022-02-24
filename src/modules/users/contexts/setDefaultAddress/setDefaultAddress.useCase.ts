import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { UserRepository } from '@modules/users/repository/user.repository';

@Injectable()
export class SetDefaultAddressUseCase {
  constructor(
    @InjectRepository(UserRepository)
    private readonly userRepository: UserRepository,
  ) {}

  async setDefaultAddress(addressID: string, userID: string): Promise<boolean> {
    await this.userRepository.setDefaultAddress(addressID, userID);
    return true;
  }

  async removeDefaultAddress(userID: string): Promise<boolean> {
    await this.userRepository.removeDefaultAddress(userID);
    return true;
  }
}
