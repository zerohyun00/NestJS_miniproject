import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { emailValidationMessage } from 'src/common/validation-message/email-validation.message';
import { emptyValidationMessage } from 'src/common/validation-message/empty-validation.message';
import { stringValidationMessage } from 'src/common/validation-message/string-validation.message';

export class AdminsLoginDto {
  @IsEmail({}, { message: emailValidationMessage })
  @IsNotEmpty({ message: emptyValidationMessage })
  email: string;

  @IsString({ message: stringValidationMessage })
  @IsNotEmpty({ message: emptyValidationMessage })
  password: string;
}
