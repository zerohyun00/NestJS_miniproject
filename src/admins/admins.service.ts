import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AdminsModel } from 'src/admins/entities/admin.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { AdminsLoginDto } from './dto/login-admin.dto';
import { RolesEnum } from 'src/common/const/roles.const';
import { AuthService } from 'src/auth/auth.service'; // AuthService 추가

@Injectable()
export class AdminsService {
  constructor(
    @InjectRepository(AdminsModel)
    private readonly adminRepository: Repository<AdminsModel>,
    private readonly authService: AuthService, // AuthService 의존성 주입
  ) {}

  async login(adminLoginDto: AdminsLoginDto) {
    const { email, password } = adminLoginDto;
    const admin = await this.validateAdmin(email, password);

    // AuthService를 활용해 JWT 생성
    return this.authService.loginUser({
      email: admin.email,
      id: admin.id,
      role: RolesEnum.ADMIN,
    });
  }

  private async validateAdmin(email: string, password: string) {
    // DB에서 관리자 계정 조회
    const admin = await this.adminRepository.findOne({ where: { email } });

    if (!admin) {
      throw new UnauthorizedException('잘못된 관리자 계정입니다.');
    }

    if (!admin.password) {
      throw new UnauthorizedException(
        '관리자 계정에 비밀번호가 설정되지 않았습니다.',
      );
    }

    // 비밀번호 검증
    const isPasswordValid = await bcrypt.compare(password, admin.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('잘못된 비밀번호입니다.');
    }

    return admin;
  }

  async getAdminByEmail(email: string): Promise<AdminsModel | null> {
    return this.adminRepository.findOne({ where: { email } });
  }
}
