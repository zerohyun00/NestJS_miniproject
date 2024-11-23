import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsIn, IsNumber, IsOptional } from 'class-validator';

export class PaginateProductsDto {
  @ApiProperty({
    description: '이 ID보다 큰 상품만 조회',
    required: false,
    example: 5,
  })
  @IsOptional()
  @IsNumber()
  where__id_more_than?: number;

  @ApiProperty({
    description: '생성일 기준 정렬 (ASC)',
    required: false,
    example: 'ASC',
  })
  @IsIn(['ASC'])
  @IsOptional()
  order__createdAt: 'ASC' = 'ASC';

  @ApiProperty({
    description: '한 번에 가져올 상품 수',
    required: false,
    example: 10,
  })
  @IsOptional()
  @IsNumber()
  take: number = 10;
}
