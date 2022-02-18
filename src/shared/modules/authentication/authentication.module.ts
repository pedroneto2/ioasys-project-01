import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';

import { BcryptProvider } from '@shared/providers/EncryptProvider/bcrypt.provider';

import { LocalStrategy } from '@shared/modules/authentication/strategies/local.strategy';
import { JwtStrategy } from '@shared/modules/authentication/strategies/jwt.strategy';
import { RefreshStrategy } from '@shared/modules/authentication/strategies/refresh.strategy';

import { JwtAuthGuard } from '@shared/modules/authentication/guards/jwt-auth.guard';

import { AuthService } from '@shared/modules/authentication/services/auth.service';
import { FindUserUseCase } from '@modules/users/contexts/findUser/findUser.useCase';
import { TokensService } from '@shared/modules/authentication/services/tokens.service';

import { UserRepository } from '@modules/users/repository/user.repository';
import { TokensRepository } from '@shared/modules/authentication/repository/tokens.repository';

import { AuthController } from '@shared/modules/authentication/controllers/auth.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserRepository, TokensRepository]),
    BcryptProvider,
    PassportModule,
    JwtModule.register({}),
  ],
  providers: [
    { provide: 'ENCRYPT_PROVIDER', useClass: BcryptProvider },
    { provide: 'APP_GUARD', useClass: JwtAuthGuard },
    AuthService,
    LocalStrategy,
    FindUserUseCase,
    JwtStrategy,
    TokensService,
    RefreshStrategy,
  ],
  controllers: [AuthController],
})
export class AuthenticationModule {}
