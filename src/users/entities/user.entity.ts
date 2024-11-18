import { Exclude } from 'class-transformer';
import { IsEmail, IsString, Length } from 'class-validator';
import { RolesEnum } from 'src/common/const/roles.const';
import { BaseModel } from 'src/common/entities/base.entity';
import { emailValidationMessage } from 'src/common/validation-message/email-validation.message';
import { lengthValidationMessage } from 'src/common/validation-message/length-validation.message';
import { stringValidationMessage } from 'src/common/validation-message/string-validation.message';
import { OrdersModel } from 'src/orders/entities/order.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';

export enum GenderEnum {
  MALE = '남자',
  FEMALE = '여자',
}
@Entity()
export class UsersModel extends BaseModel {
  @Column({
    unique: true,
  })
  @IsString({
    message: stringValidationMessage,
  })
  @IsEmail({}, { message: emailValidationMessage })
  email: string;

  @Column()
  @IsString({
    message: stringValidationMessage,
  })
  @Length(2, 10, {
    message: lengthValidationMessage,
  })
  @Exclude({
    toPlainOnly: true,
  })
  password: string;

  @Column({
    enum: Object.values(GenderEnum),
  })
  gender: GenderEnum;

  @Column()
  @IsString({
    message: stringValidationMessage,
  })
  address: string;

  @Column()
  @IsString({
    message: stringValidationMessage,
  })
  mobile_number: string;

  @OneToMany(() => OrdersModel, (order) => order.user)
  @JoinColumn({ name: 'user_id' })
  orders: OrdersModel[];

  @Column({
    enum: Object.values(RolesEnum),
    default: RolesEnum.USER,
  })
  role: RolesEnum;
}
