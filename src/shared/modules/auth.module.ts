import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthService } from '@shared/modules/auth/services/auth.service';
import { LocalStrategy } from '@shared/modules/auth/strategies/local.strategy';
import { FindUserUseCase } from '@modules/users/contexts/findUser/findUser.useCase';
import { BcryptProvider } from '@shared/providers/EncryptProvider/bcrypt.provider';
import { AuthController } from '@shared/modules/auth/controllers/auth.controller';
import { UserRepository } from '@modules/users/repository/user.repository';
import { JwtStrategy } from '@shared/modules/auth/strategies/jwt.strategy';
import { ConfigModule } from '@nestjs/config';
import envVariables from '@config/env';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserRepository]),
    BcryptProvider,
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async () => ({
        secret: envVariables().jwtSecret,
        signOptions: { expiresIn: envVariables().expiresIn },
      }),
    }),
  ],
  providers: [
    { provide: 'ENCRYPT_PROVIDER', useClass: BcryptProvider },
    AuthService,
    LocalStrategy,
    FindUserUseCase,
    JwtStrategy,
  ],
  controllers: [AuthController],
})
export class AuthModule {}
