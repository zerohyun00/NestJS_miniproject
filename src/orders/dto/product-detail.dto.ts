import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class ProductDetailDto {
  @ApiProperty({
    description: '상품의 ID',
    example: 101,
  })
  @IsNotEmpty()
  @IsNumber()
  product_id: number;

  @ApiProperty({
    description: '상품의 사이즈',
    example: 'L',
  })
  @IsNotEmpty()
  @IsString()
  size: string;

  @ApiProperty({
    description: '상품의 수량',
    example: 2,
  })
  @IsNotEmpty()
  @IsNumber()
  quantity: number;
}
