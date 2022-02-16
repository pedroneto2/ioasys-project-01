import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const adminRoute = this.reflector.getAllAndOverride<boolean>(
      'ADMIN_ROUTE',
      [context.getHandler(), context.getClass()],
    );
    if (!adminRoute) {
      return true;
    }
    const { user } = context.switchToHttp().getRequest();
    return !!user.isAdmin;
  }
}
