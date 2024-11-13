import { BaseModel } from 'src/common/entities/base.entity';
import { Column } from 'typeorm';

export enum Gender {
  MALE = 'male',
  FEMALE = 'female',
}

export class UsersModel extends BaseModel {
  @Column()
  email: string;

  @Column()
  password: string;

  @Column({
    enum: Gender,
  })
  gender: Gender;

  @Column()
  address: string;

  @Column()
  mobile_number: string;
}
