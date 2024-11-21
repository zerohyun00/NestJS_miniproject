import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { CategoriesModel } from './category.entity';
import { ICategoriesRepository } from './category.interface';

@Injectable()
export class CategoriesRepository
  extends Repository<CategoriesModel>
  implements ICategoriesRepository
{
  constructor(private readonly dataSource: DataSource) {
    super(CategoriesModel, dataSource.createEntityManager());
  }

  async findByName(name: string): Promise<CategoriesModel | null> {
    return this.findOne({ where: { name } });
  }
}
