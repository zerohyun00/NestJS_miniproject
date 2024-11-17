import { BaseModel } from 'src/common/entities/base.entity';
import { ProductsModel } from './product.entity';
import { Entity, ManyToOne } from 'typeorm';

@Entity()
export class ProductsImageModel extends BaseModel {
  url: string;

  @ManyToOne(() => ProductsModel, (product) => product.images, {
    onDelete: 'CASCADE',
  })
  product: ProductsModel;
}
