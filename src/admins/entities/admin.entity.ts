import { ApiProperty } from '@nestjs/swagger';
import { RolesEnum } from 'src/common/const/roles.const';
import { BaseModel } from 'src/common/entities/base.entity';
import { Column, Entity } from 'typeorm';

@Entity()
export class AdminsModel extends BaseModel {
  @ApiProperty({
    example: 'admin@example.com',
    description: '관리자의 이메일 주소',
  })
  @Column({
    unique: true,
  })
  email: string;

  @ApiProperty({
    example: 'password123',
    description: '관리자의 비밀번호',
  })
  @Column()
  password: string;

  @ApiProperty({
    example: 'ADMIN',
    description: '관리자의 권한',
    enum: RolesEnum,
  })
  @Column({
    type: 'enum',
    enum: RolesEnum,
    default: RolesEnum.ADMIN,
  })
  role: RolesEnum;
}
