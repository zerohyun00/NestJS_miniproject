import { Body, Controller, Post, UseInterceptors } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterUserDto } from './dto/register-user.dto';
import { LogInterceptor } from 'src/common/interceptor/log.interceptor';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
@UseInterceptors(LogInterceptor)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({
    summary: '인증 코드 전송',
    description: '입력한 이메일로 인증 코드를 전송합니다.',
  })
  @ApiResponse({
    status: 200,
    description: '인증번호가 이메일로 전송되었습니다.',
    schema: {
      example: {
        message: '인증번호가 이메일로 전송되었습니다.',
      },
    },
  })
  @Post('send-code')
  async sendVerificationCode(@Body('email') email: string) {
    await this.authService.sendVerificationCode(email);
    return { message: '인증번호가 이메일로 전송되었습니다.' };
  }

  @ApiOperation({
    summary: '인증 코드 확인',
    description: '입력한 인증 코드를 검증합니다.',
  })
  @ApiResponse({
    status: 200,
    description: '인증 코드 검증 결과가 반환됩니다.',
    schema: {
      example: {
        message: '인증번호가 확인되었습니다.',
      },
    },
  })
  @ApiBody({
    schema: {
      example: {
        email: 'user@example.com',
        code: '123456',
      },
    },
  })
  @Post('verify-code')
  async verifyCode(@Body('email') email: string, @Body('code') code: string) {
    const isVerified = await this.authService.verifyCode(email, code);
    return { message: isVerified ? '인증번호가 확인되었습니다.' : '인증 실패' };
  }

  @ApiOperation({
    summary: '회원가입',
    description: '이메일 인증 후 회원가입을 진행합니다.',
  })
  @ApiResponse({
    status: 201,
    description: '회원가입 성공',
    schema: {
      example: {
        id: 1,
        email: 'user@example.com',
        gender: '남자',
        address: '서울시 강남구 테헤란로',
        mobile_number: '010-1234-5678',
      },
    },
  })
  @Post('register')
  postRegister(@Body() body: RegisterUserDto) {
    return this.authService.registerWithEmail(body);
  }

  @ApiOperation({
    summary: '로그인',
    description: '이메일과 비밀번호로 로그인합니다.',
  })
  @ApiResponse({
    status: 200,
    description: '로그인 성공. JWT 토큰이 반환됩니다.',
    schema: {
      example: {
        accessToken: 'jwt-token',
      },
    },
  })
  @ApiBody({
    schema: {
      example: {
        email: 'user@example.com',
        password: 'password123',
      },
    },
  })
  @Post('login')
  async postLogin(
    @Body('email') email: string,
    @Body('password') password: string,
  ) {
    return await this.authService.loginWithEmail({ email, password });
  }
}
