import { Type } from 'class-transformer';
import { IsIn, IsNumber, IsOptional } from 'class-validator';
import { numberValidationMessage } from 'src/common/validation-message/number-validation.message';

export class PaginateProductsDto {
  // @Type(() => Number)
  @IsNumber({}, { message: numberValidationMessage })
  @IsOptional()
  where__id_more_than?: number;

  @IsIn(['ASC'])
  @IsOptional()
  order__createdAt: 'ASC' = 'ASC';

  @IsNumber({}, { message: numberValidationMessage })
  @IsOptional()
  take: number = 10;
}
