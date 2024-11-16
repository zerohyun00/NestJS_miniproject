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
  @IsEnum(GenderEnum, {
    message: `성별은 ${Object.values(GenderEnum).join(', ')} 중 하나여야 합니다.`,
  })
  @IsNotEmpty({ message: '성별을 입력해주세요!' })
  gender: GenderEnum;
}
