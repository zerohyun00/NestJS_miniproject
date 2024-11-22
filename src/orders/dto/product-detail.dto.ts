import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { emptyValidationMessage } from 'src/common/validation-message/empty-validation.message';
import { numberValidationMessage } from 'src/common/validation-message/number-validation.message';
import { stringValidationMessage } from 'src/common/validation-message/string-validation.message';

export class ProductDetailDto {
  @IsNotEmpty({ message: emptyValidationMessage })
  @IsNumber({}, { message: numberValidationMessage })
  product_id: number;

  @IsNotEmpty({ message: emptyValidationMessage })
  @IsString({ message: stringValidationMessage })
  size: string;

  @IsNotEmpty({ message: emptyValidationMessage })
  @IsNumber({}, { message: numberValidationMessage })
  quantity: number;
}
