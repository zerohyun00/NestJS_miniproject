import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { ROELS_KEY } from '../decorator/roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRole = this.reflector.getAllAndOverride(ROELS_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRole) {
      return true;
    }
    // const { user } = context.switchToHttp().getRequest();

    // // if (!user) {
    // //   throw new UnauthorizedException(`토큰을 제공 해주세요!`);
    // // }
    // // if (user.role !== requiredRole) {
    // //   throw new ForbiddenException(
    // //     `이 작업을 수행할 권한이 없습니다. ${requiredRole} 권한이 필요합니다.`,
    // //   );
    // // }
    // return true;
  }
}
