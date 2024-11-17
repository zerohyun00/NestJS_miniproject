import { BaseModel } from 'src/common/entities/base.entity';
import { Column, Entity } from 'typeorm';

@Entity()
export class AdminsModel extends BaseModel {
  @Column({
    unique: true,
  })
  email: string;

  @Column()
  password: string;
}
