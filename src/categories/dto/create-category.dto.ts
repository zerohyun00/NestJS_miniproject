import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCategoryDto {
  @ApiProperty({
    description: '카테고리 이름',
    example: 'Electronics',
  })
  @IsNotEmpty({ message: '카테고리 이름은 필수입니다.' })
  @IsString({ message: '카테고리 이름은 문자열이어야 합니다.' })
  name: string;
}
