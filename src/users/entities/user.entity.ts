import { Exclude } from 'class-transformer';
import { RolesEnum } from 'src/common/const/roles.const';
import { BaseModel } from 'src/common/entities/base.entity';
import { AddressModel } from 'src/orders/entities/adress.entity';
import { OrdersModel } from 'src/orders/entities/order.entity';
import { Column, Entity, JoinColumn, OneToMany } from 'typeorm';

export enum GenderEnum {
  MALE = '남자',
  FEMALE = '여자',
}

@Entity()
export class UsersModel extends BaseModel {
  @Column({
    unique: true,
  })
  email: string;

  @Column()
  @Exclude({
    toPlainOnly: true,
  })
  password: string;

  @Column({
    type: 'enum',
    enum: Object.values(GenderEnum),
    default: GenderEnum.MALE,
  })
  gender: GenderEnum;

  @OneToMany(() => AddressModel, (address) => address.user)
  address: AddressModel[];

  @Column()
  mobile_number: string;

  @OneToMany(() => OrdersModel, (order) => order.user)
  @JoinColumn({ name: 'user_id' })
  orders: OrdersModel[];

  @Column({
    type: 'enum',
    enum: Object.values(RolesEnum),
    default: RolesEnum.USER,
  })
  role: RolesEnum;
}
