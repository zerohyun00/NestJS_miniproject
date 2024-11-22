import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { AdminsRepository } from './entities/admin.repository';
import { AdminsLoginDto } from './dto/login-admin.dto';
import { RolesEnum } from 'src/common/const/roles.const';
import { AuthService } from 'src/auth/auth.service';
import { UsersRepository } from 'src/users/entities/user.repository';
import { Between, Repository } from 'typeorm';
import { OrdersRepository } from 'src/orders/entities/order.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductsModel } from 'src/products/entities/product.entity';

@Injectable()
export class AdminsService {
  constructor(
    private readonly adminsRepository: AdminsRepository,
    private readonly usersRepository: UsersRepository,
    private readonly ordersRepository: OrdersRepository,
    @InjectRepository(ProductsModel)
    private readonly productsRepository: Repository<ProductsModel>,
    private readonly authService: AuthService,
  ) {}

  async login(adminLoginDto: AdminsLoginDto) {
    const { email, password } = adminLoginDto;
    const admin = await this.validateAdmin(email, password);

    return this.authService.loginUser({
      email: admin.email,
      id: admin.id,
      role: RolesEnum.ADMIN,
    });
  }

  private async validateAdmin(email: string, password: string) {
    const admin = await this.adminsRepository.findByEmail(email);

    if (!admin) {
      throw new UnauthorizedException('잘못된 관리자 계정입니다.');
    }

    if (!admin.password) {
      throw new UnauthorizedException(
        '관리자 계정에 비밀번호가 설정되지 않았습니다.',
      );
    }

    const isPasswordValid = await bcrypt.compare(password, admin.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('잘못된 비밀번호입니다.');
    }

    return admin;
  }

  async getAdminByEmail(email: string) {
    return this.adminsRepository.findByEmail(email);
  }

  async getNewSignUpsCount(): Promise<number> {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    return this.usersRepository.count({
      where: { createdAt: Between(today, tomorrow) },
    });
  }

  async getTodayOrderCount(): Promise<number> {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    return this.ordersRepository.count({
      where: { order_date: Between(today, tomorrow) },
    });
  }

  async getMostViewed(): Promise<any> {
    return this.productsRepository
      .createQueryBuilder('product')
      .orderBy('product.view_count', 'DESC')
      .select(['product.id', 'product.name', 'product.view_count'])
      .getOne();
  }

  async getTodaySalesTotal(): Promise<number> {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    const result = await this.ordersRepository
      .createQueryBuilder('order')
      .where('order.order_date BETWEEN :today AND :tomorrow', {
        today,
        tomorrow,
      })
      .select('SUM(order.total_amount)', 'totalSales')
      .getRawOne();

    return result?.totalSales || 0;
  }
}
