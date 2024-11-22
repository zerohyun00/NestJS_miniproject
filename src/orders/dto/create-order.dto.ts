import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ProductDetailDto } from './product-detail.dto';
import { emptyValidationMessage } from 'src/common/validation-message/empty-validation.message';
import { numberValidationMessage } from 'src/common/validation-message/number-validation.message';
import { stringValidationMessage } from 'src/common/validation-message/string-validation.message';

export class CreateOrderDto {
  @IsOptional()
  @IsNumber({}, { message: numberValidationMessage })
  address_id?: number;

  @IsOptional()
  @IsString({ message: stringValidationMessage })
  new_address_name?: string;

  @IsOptional()
  @IsString({ message: stringValidationMessage })
  new_address?: string;

  @IsNotEmpty({ message: emptyValidationMessage })
  @IsString({ message: stringValidationMessage })
  recipient_name: string;

  @IsNotEmpty({ message: emptyValidationMessage })
  @IsString({ message: stringValidationMessage })
  phone_number: string;

  @IsNotEmpty({ message: emptyValidationMessage })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ProductDetailDto)
  product_details: ProductDetailDto[];
}
