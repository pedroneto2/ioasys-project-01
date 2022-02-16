import { Module } from '@nestjs/common';
import { AdminGuard } from '@shared/modules/authorization/guards/admin.guard';

@Module({
  providers: [{ provide: 'APP_GUARD', useClass: AdminGuard }],
})
export class AuthorizationModule {}
