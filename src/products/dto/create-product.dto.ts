import { IsNotEmpty, IsNumber, IsString, IsArray } from 'class-validator';
import { emailValidationMessage } from 'src/common/validation-message/email-validation.message';
import { emptyValidationMessage } from 'src/common/validation-message/empty-validation.message';
import { numberValidationMessage } from 'src/common/validation-message/number-validation.message';
import { stringValidationMessage } from 'src/common/validation-message/string-validation.message';

export class CreateProductDto {
  @IsNotEmpty({ message: emptyValidationMessage })
  @IsString({ message: stringValidationMessage })
  name: string;

  @IsNotEmpty({ message: emptyValidationMessage })
  @IsString({ message: stringValidationMessage })
  description: string;

  @IsNotEmpty({ message: emptyValidationMessage })
  @IsNumber({}, { message: numberValidationMessage })
  price: number;

  @IsNotEmpty({ message: emptyValidationMessage })
  @IsNumber({}, { message: numberValidationMessage })
  quantity: number;

  @IsArray()
  sizes: string[];

  @IsNotEmpty({ message: emptyValidationMessage })
  @IsNumber({}, { message: numberValidationMessage })
  categoryId: number;
}
