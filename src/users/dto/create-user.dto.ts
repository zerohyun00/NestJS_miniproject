import { IsEmail, IsEnum, IsNotEmpty, IsString, Length } from 'class-validator';
import { GenderEnum } from '../entities/user.entity';
import { RolesEnum } from 'src/common/const/roles.const';
import { emptyValidationMessage } from 'src/common/validation-message/empty-validation.message';
import { emailValidationMessage } from 'src/common/validation-message/email-validation.message';
import { stringValidationMessage } from 'src/common/validation-message/string-validation.message';
import { lengthValidationMessage } from 'src/common/validation-message/length-validation.message';
import { enumValidationMessage } from 'src/common/validation-message/enum-validation.message';

export class CreateUserDto {
  @IsNotEmpty({ message: emptyValidationMessage })
  @IsEmail({}, { message: emailValidationMessage })
  email: string;

  @IsNotEmpty({ message: emptyValidationMessage })
  @IsString({ message: stringValidationMessage })
  @Length(6, 20, {
    message: lengthValidationMessage,
  })
  password: string;

  @IsNotEmpty({ message: emptyValidationMessage })
  @IsEnum(GenderEnum, { message: enumValidationMessage })
  gender: GenderEnum;

  @IsNotEmpty({ message: emptyValidationMessage })
  @IsString({ message: stringValidationMessage })
  address: string;

  @IsNotEmpty({ message: emptyValidationMessage })
  @IsString({ message: stringValidationMessage })
  mobile_number: string;

  @IsEnum(RolesEnum, { message: enumValidationMessage })
  role: RolesEnum;
}
