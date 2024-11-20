import {
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { OrderStatus } from '../entities/order.entity';
import { emptyValidationMessage } from 'src/common/validation-message/empty-validation.message';
import { numberValidationMessage } from 'src/common/validation-message/number-validation.message';
import { stringValidationMessage } from 'src/common/validation-message/string-validation.message';
import { enumValidationMessage } from 'src/common/validation-message/enum-validation.message';

export class CreateOrderDto {
  @IsNotEmpty({ message: emptyValidationMessage })
  @IsNumber({}, { message: numberValidationMessage })
  address_id?: number;

  @IsOptional()
  @IsString({ each: true, message: stringValidationMessage })
  new_address_name?: string[];

  @IsNotEmpty({ message: emptyValidationMessage })
  @IsString({ message: stringValidationMessage })
  recipient_name: string;

  @IsNotEmpty({ message: emptyValidationMessage })
  @IsString({ message: stringValidationMessage })
  phone_number: string;

  @IsString({ message: stringValidationMessage })
  new_address?: string;

  @IsNotEmpty({ message: emptyValidationMessage })
  @IsArray()
  product_details: { product_id: number; size: string; quantity: number }[];
}
