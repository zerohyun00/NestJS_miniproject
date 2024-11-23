import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { ProductDetailDto } from './product-detail.dto';

export class CreateOrderDto {
  @ApiProperty({
    description: '기존 주소의 ID',
    example: 1,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  address_id?: number;

  @ApiProperty({
    description: '신규 주소 이름',
    example: '사무실',
    required: false,
  })
  @IsOptional()
  @IsString()
  new_address_name?: string;

  @ApiProperty({
    description: '신규 주소 내용',
    example: '서울특별시 강남구 테헤란로',
    required: false,
  })
  @IsOptional()
  @IsString()
  new_address?: string;

  @ApiProperty({
    description: '수령인의 이름',
    example: '테스트 사용자',
  })
  @IsNotEmpty()
  @IsString()
  recipient_name: string;

  @ApiProperty({
    description: '수령인의 전화번호',
    example: '010-1234-5678',
  })
  @IsNotEmpty()
  @IsString()
  phone_number: string;

  @ApiProperty({
    description: '주문할 상품의 상세 정보',
    type: [ProductDetailDto],
  })
  @IsNotEmpty()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ProductDetailDto)
  product_details: ProductDetailDto[];
}
