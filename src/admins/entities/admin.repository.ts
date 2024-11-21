import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { AdminsModel } from './admin.entity';
import { IAdminsRepository } from './admin.interface';

@Injectable()
export class AdminsRepository
  extends Repository<AdminsModel>
  implements IAdminsRepository
{
  constructor(private readonly dataSource: DataSource) {
    super(AdminsModel, dataSource.createEntityManager());
  }

  async findByEmail(email: string): Promise<AdminsModel> {
    return this.findOne({ where: { email } });
  }
}
