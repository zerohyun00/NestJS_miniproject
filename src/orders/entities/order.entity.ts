import { IsNumber } from 'class-validator';
import { PartialBaseModel } from 'src/common/entities/base.entity';
import { numberValidationMessage } from 'src/common/validation-message/number-validation.message';
import { UsersModel } from 'src/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
} from 'typeorm';

export enum OrderStatus {
  PENDING = '결제 대기',
  CONFIRMED = '주문 확인',
  CANCELLED = '취소됨',
  COMPLETED = '주문 완료',
}
@Entity()
export class OrdersModel extends PartialBaseModel {
  @CreateDateColumn()
  order_date: Date;

  @Column({
    type: 'enum',
    enum: OrderStatus,
    default: OrderStatus.PENDING,
  })
  status: OrderStatus;

  @Column()
  @IsNumber(
    {},
    {
      message: numberValidationMessage,
    },
  )
  total_amount: number;

  @ManyToOne(() => UsersModel, (user) => user.orders)
  user: UsersModel;
}
