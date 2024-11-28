import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, IsArray } from 'class-validator';

export class CreateProductDto {
  @ApiProperty({ description: '상품 이름', example: '상품명' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ description: '상품 설명', example: '상품 설명' })
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty({ description: '상품 가격', example: 10000 })
  @IsNotEmpty()
  @IsNumber()
  price: number;

  @ApiProperty({ description: '상품 재고 수량', example: 10 })
  @IsNotEmpty()
  @IsNumber()
  quantity: number;

  @ApiProperty({
    description: '상품 사이즈 목록',
    example: ['S', 'M', 'L'],
  })
  sizes: string[];

  @ApiProperty({ description: '카테고리 ID', example: 1 })
  @IsNotEmpty()
  @IsNumber()
  categoryId: number;
}
