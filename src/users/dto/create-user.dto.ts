import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsNotEmpty, IsString, Length } from 'class-validator';
import { GenderEnum } from '../entities/user.entity';
import { RolesEnum } from 'src/common/const/roles.const';

export class CreateUserDto {
  @ApiProperty({
    example: 'user@example.com',
    description: '사용자의 이메일 주소',
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'password123',
    description: '사용자의 비밀번호. 6자 이상 20자 이하',
    minLength: 6,
    maxLength: 20,
  })
  @IsNotEmpty()
  @IsString()
  @Length(6, 20)
  password: string;

  @ApiProperty({
    example: '남자',
    description: '사용자의 성별',
    enum: GenderEnum,
  })
  @IsNotEmpty()
  @IsEnum(GenderEnum)
  gender: GenderEnum;

  @ApiProperty({
    example: '서울특별시 강남구 테헤란로 123',
    description: '사용자의 주소',
  })
  @IsNotEmpty()
  @IsString()
  address: string;

  @ApiProperty({
    example: '010-1234-5678',
    description: '사용자의 전화번호',
  })
  @IsNotEmpty()
  @IsString()
  mobile_number: string;

  @ApiProperty({
    example: RolesEnum.USER,
    description: '사용자의 권한',
    enum: RolesEnum,
  })
  @IsEnum(RolesEnum)
  role: RolesEnum;
}
