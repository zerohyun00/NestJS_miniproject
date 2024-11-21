import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { AdminsRepository } from './entities/admin.repository';
import { AdminsLoginDto } from './dto/login-admin.dto';
import { RolesEnum } from 'src/common/const/roles.const';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class AdminsService {
  constructor(
    private readonly adminsRepository: AdminsRepository,
    private readonly authService: AuthService,
  ) {}

  async login(adminLoginDto: AdminsLoginDto) {
    const { email, password } = adminLoginDto;
    const admin = await this.validateAdmin(email, password);

    return this.authService.loginUser({
      email: admin.email,
      id: admin.id,
      role: RolesEnum.ADMIN,
    });
  }

  private async validateAdmin(email: string, password: string) {
    const admin = await this.adminsRepository.findByEmail(email);

    if (!admin) {
      throw new UnauthorizedException('잘못된 관리자 계정입니다.');
    }

    if (!admin.password) {
      throw new UnauthorizedException(
        '관리자 계정에 비밀번호가 설정되지 않았습니다.',
      );
    }

    const isPasswordValid = await bcrypt.compare(password, admin.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('잘못된 비밀번호입니다.');
    }

    return admin;
  }

  async getAdminByEmail(email: string) {
    return this.adminsRepository.findByEmail(email);
  }
}
