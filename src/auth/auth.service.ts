import {
  BadRequestException,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { ConfigService } from '@nestjs/config';
import { RegisterUserDto } from './dto/register-user.dto';
import * as bcrypt from 'bcrypt';
import {
  ENV_GMAIL_ADDRESS_KEY,
  ENV_JWT_SECRET_KEY,
} from 'src/common/const/env-keys.const';
import * as nodemailer from 'nodemailer';
import { UsersModel } from 'src/users/entities/user.entity';
import { CACHE_MANAGER, Cache } from '@nestjs/cache-manager';
import { AdminsModel } from 'src/admins/entities/admin.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
    private readonly configService: ConfigService,
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
  ) {}

  async sendVerificationCode(email: string): Promise<void> {
    const user = await this.usersService.getUserByEmail(email);
    if (user) {
      throw new BadRequestException('이미 가입된 이메일입니다');
    }

    const verificationCode = Math.floor(
      100000 + Math.random() * 900000,
    ).toString();
    await this.cacheManager.set(email, verificationCode, 180);
    console.log('인증번호: ', verificationCode);

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: this.configService.get<string>('ENV_GMAIL_ADDRESS_KEY'),
        pass: this.configService.get<string>('ENV_GMAIL_PASSWORD_KEY'),
      },
    });

    await transporter.sendMail({
      from: ENV_GMAIL_ADDRESS_KEY,
      to: email,
      subject: '인증번호 테스트',
      text: `인증번호는 ${verificationCode}라우 동무`,
    });
  }

  async verifyCode(email: string, code: string): Promise<boolean> {
    const pickCode = await this.cacheManager.get<string>(email);
    if (!pickCode) {
      throw new BadRequestException(
        '인증번호가 만료되었거나 존재하지 않습니다.',
      );
    }

    if (pickCode !== code) {
      throw new BadRequestException('인증번호가 올바르지 않습니다.');
    }

    // 인증 완료 상태를 Redis에 저장
    await this.cacheManager.set(`${email}-verified`, true, 3600);

    // 인증번호 삭제
    await this.cacheManager.del(email);

    return true;
  }

  async registerWithEmail(user: RegisterUserDto) {
    const isVerified = await this.cacheManager.get<boolean>(
      `${user.email}-verified`,
    );
    if (!isVerified) {
      throw new BadRequestException('이메일 인증이 완료되지 않았습니다.');
    }

    const hashed = await bcrypt.hash(user.password, 10);
    const newUser = await this.usersService.createUser({
      ...user,
      password: hashed,
    });
    await this.cacheManager.del(`${user.email}-verified`);
    return this.loginUser(newUser);
  }

  async loginWithEmail(user: Pick<UsersModel, 'email' | 'password'>) {
    const existingUser = await this.authEmailAndPassword(user);
    return this.loginUser(existingUser);
  }

  async authEmailAndPassword(user: Pick<UsersModel, 'email' | 'password'>) {
    const existingUser = await this.usersService.getUserByEmail(user.email);
    if (!existingUser) {
      throw new UnauthorizedException('존재하지 않는 사용자입니다.');
    }
    const passwordMatch = await bcrypt.compare(
      user.password,
      existingUser.password,
    );
    if (!passwordMatch) {
      throw new UnauthorizedException('비밀번호가 틀렸습니다.');
    }
    return existingUser;
  }

  loginUser(user: Pick<UsersModel | AdminsModel, 'email' | 'id' | 'role'>) {
    return {
      accessToken: this.signToken(user, 'access'),
      refreshToken: this.signToken(user, 'refresh'),
    };
  }

  verifyToken(token: string) {
    try {
      const decoded = this.jwtService.verify(token, {
        secret: this.configService.get<string>('JWT_SECRET'),
      });
      return decoded;
    } catch (e) {
      throw new UnauthorizedException('토큰이 만료됐거나 잘못된 토큰입니다.');
    }
  }

  extractTokenFromHeader(header: string, isBearer: boolean) {
    const splitToken = header.split(' ');

    const prefix = isBearer ? 'Bearer' : 'refresh';

    if (splitToken.length !== 2 || splitToken[0] !== prefix) {
      throw new UnauthorizedException('잘못된 토큰 형식입니다!');
    }

    const token = splitToken[1];

    return token;
  }

  signToken(
    user: Pick<UsersModel | AdminsModel, 'email' | 'id' | 'role'>,
    tokenType: 'access' | 'refresh',
  ) {
    const payload = {
      email: user.email,
      sub: user.id,
      role: user.role,
      type: tokenType,
    };

    return this.jwtService.sign(payload, {
      secret: this.configService.get<string>('JWT_SECRET'),
      expiresIn: tokenType === 'access' ? 300 : 3600, // seconds
    });
  }
}
