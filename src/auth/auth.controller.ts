import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterUserDto } from './dto/register-user.dto';
import { LogInterceptor } from 'src/common/interceptor/log.interceptor';

@Controller('auth')
@UseInterceptors(LogInterceptor)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('send-code')
  async sendVerficationCode(@Body('email') email: string) {
    await this.authService.sendVerificationCode(email);
    return { message: '인증번호가 이메일로 전송되었습니다.' };
  }

  // 인증번호 확인
  @Post('verify-code')
  async verifyCode(@Body('email') email: string, @Body('code') code: string) {
    const isVerified = await this.authService.verifyCode(email, code);
    return { message: isVerified ? '인증번호가 확인되었습니다.' : '인증 실패' };
  }

  @Post('register')
  postRegister(@Body() body: RegisterUserDto) {
    return this.authService.registerWithEmail(body);
  }

  @Post('login')
  async postLogin(
    @Body('email') email: string,
    @Body('password') password: string,
  ) {
    return await this.authService.loginWithEmail({ email, password });
  }
}
