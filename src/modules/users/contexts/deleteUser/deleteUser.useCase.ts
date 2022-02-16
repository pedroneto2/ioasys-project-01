import { Injectable, Inject, UnauthorizedException } from '@nestjs/common';
import { UserRepository } from '@modules/users/repository/user.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { BcryptProvider } from '@shared/providers/EncryptProvider/bcrypt.provider';

@Injectable()
export class DeleteUserUseCase {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    @Inject('ENCRYPT_PROVIDER')
    private encryption: BcryptProvider,
  ) {}

  async execute(id: string, password: string): Promise<boolean> {
    const user = await this.userRepository.findById(id);
    const validPassword = await this.encryption.compareHash(
      password,
      user.password,
    );
    if (!validPassword) {
      throw new UnauthorizedException();
    }
    const success = await this.userRepository.deleteUser(id);
    return success;
  }
}
