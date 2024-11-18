import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AdminsModel } from 'src/admins/entities/admin.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { AdminsLoginDto } from './dto/login-admin.dto';
import { RolesEnum } from 'src/common/const/roles.const';

@Injectable()
export class AdminsService {
  constructor(
    @InjectRepository(AdminsModel)
    private readonly adminRepository: Repository<AdminsModel>,
    private readonly jwtService: JwtService,
  ) {}

  async login(adminLoginDto: AdminsLoginDto) {
    const { email, password } = adminLoginDto;
    const admin = await this.validateAdmin(email, password);

    // JWT 생성
    const payload = { email: admin.email, role: RolesEnum.ADMIN };
    const accessToken = this.jwtService.sign(payload);

    return { accessToken };
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

    return { email: admin.email, role: RolesEnum.ADMIN };
  }
}
