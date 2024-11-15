import { PickType } from '@nestjs/mapped-types';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { stringValidationMessage } from 'src/common/validation-message/string-validation.message';
import { GenderEnum, UsersModel } from 'src/users/entities/user.entity';

export class RegisterUserDto extends PickType(UsersModel, [
  'email',
  'gender',
  'address',
  'mobile_number',
  'password',
]) {
  @IsString({
    message: stringValidationMessage,
  })
  @IsNotEmpty({ message: '인증번호를 입력해주세요!' })
  verificationCode: string;
}
