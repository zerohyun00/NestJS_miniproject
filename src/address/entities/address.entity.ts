import { BaseModel } from 'src/common/entities/base.entity';
import { Column, Entity, ManyToOne } from 'typeorm';
import { UsersModel } from 'src/users/entities/user.entity';

@Entity()
export class AddressModel extends BaseModel {
  @Column()
  address_name: string;

  @Column()
  address: string;

  @ManyToOne(() => UsersModel, (user) => user.address, {
    onDelete: 'CASCADE',
  })
  user: UsersModel;
}
