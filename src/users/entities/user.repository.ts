import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { UsersModel } from './user.entity';
import { IUsersRepository } from './user.interface';

@Injectable()
export class UsersRepository
  extends Repository<UsersModel>
  implements IUsersRepository
{
  constructor(private readonly dataSource: DataSource) {
    super(UsersModel, dataSource.createEntityManager());
  }

  async findByEmail(email: string): Promise<UsersModel | null> {
    return this.findOne({ where: { email } });
  }

  async checkEmailExists(email: string): Promise<boolean> {
    const count = await this.count({ where: { email } });
    return count > 0;
  }
}
