import { IsNotEmpty, IsString } from 'class-validator';
import { emailValidationMessage } from 'src/common/validation-message/email-validation.message';
import { stringValidationMessage } from 'src/common/validation-message/string-validation.message';

export class CreateCategoryDto {
  @IsNotEmpty({ message: emailValidationMessage })
  @IsString({ message: stringValidationMessage })
  name: string;
}
