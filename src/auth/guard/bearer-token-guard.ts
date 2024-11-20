import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from '../auth.service';
import { UsersService } from 'src/users/users.service';
import { AdminsService } from 'src/admins/admins.service';

@Injectable()
export class BearerTokenGuard implements CanActivate {
  constructor(
    protected readonly authService: AuthService,
    protected readonly usersService: UsersService,
    protected readonly adminsService: AdminsService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    const rawToken = req.headers['authorization'];

    if (!rawToken) {
      throw new UnauthorizedException('토큰이 없습니다!');
    }

    const token = this.authService.extractTokenFromHeader(rawToken, true);

    const result = await this.authService.verifyToken(token);

    let user;
    if (result.role === 'ADMIN') {
      // Admin인 경우 Admin 테이블에서 조회
      user = await this.adminsService.getAdminByEmail(result.email);
    } else if (result.role === 'USER') {
      // User인 경우 User 테이블에서 조회
      user = await this.usersService.getUserByEmail(result.email);
    }

    if (!user) {
      throw new UnauthorizedException('유효하지 않은 사용자/관리자입니다.');
    }

    req.user = user;
    req.token = token;
    req.tokenType = result.type;

    return true;
  }
}

@Injectable()
export class AccessTokenGuard extends BearerTokenGuard {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    await super.canActivate(context);

    const req = context.switchToHttp().getRequest();

    if (req.tokenType !== 'access') {
      throw new UnauthorizedException('Access Token이 아닙니다.');
    }
    return true;
  }
}
