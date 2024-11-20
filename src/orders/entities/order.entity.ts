import { PartialBaseModel } from 'src/common/entities/base.entity';
import { ProductsModel } from 'src/products/entities/product.entity';
import { UsersModel } from 'src/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
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

  @Column('decimal')
  total_amount: number;

  @Column()
  recipient_name: string;

  @Column()
  phone_number: string;

  @Column()
  address: string;

  @ManyToOne(() => UsersModel, (user) => user.orders, { eager: true })
  user: UsersModel;

  @ManyToMany(() => ProductsModel)
  @JoinTable()
  products: ProductsModel[];
}
