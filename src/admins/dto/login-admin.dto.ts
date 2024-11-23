import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class AdminsLoginDto {
  @ApiProperty({
    example: 'admin@example.com',
    description: '관리자의 이메일 주소',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    example: 'password123',
    description: '관리자의 비밀번호',
  })
  @IsString()
  @IsNotEmpty()
  password: string;
}
