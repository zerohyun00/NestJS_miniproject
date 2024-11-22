import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AdminsService } from './admins.service';
import { AdminsLoginDto } from './dto/login-admin.dto';
import { LogInterceptor } from 'src/common/interceptor/log.interceptor';
import { Roles } from './decorator/roles.decorator';
import { RolesEnum } from 'src/common/const/roles.const';
import { RolesGuard } from './guard/roles.guard';
import { AccessTokenGuard } from 'src/auth/guard/bearer-token-guard';

@Controller('admin')
@UseInterceptors(LogInterceptor)
export class AdminsController {
  constructor(private readonly adminsService: AdminsService) {}

  @Post('login')
  async login(@Body() adminLoginDto: AdminsLoginDto) {
    return this.adminsService.login(adminLoginDto);
  }

  @UseGuards(AccessTokenGuard)
  @Roles(RolesEnum.ADMIN)
  @Get('new-signups')
  getNewSignupsCount() {
    return this.adminsService.getNewSignUpsCount();
  }

  @UseGuards(AccessTokenGuard)
  @Get('today-orders')
  getTodayOrderCount() {
    return this.adminsService.getTodayOrderCount();
  }

  @UseGuards(AccessTokenGuard)
  @Get('most-viewed')
  getMostViewed() {
    return this.adminsService.getMostViewed();
  }

  @UseGuards(AccessTokenGuard)
  @Get('today-total')
  getTodaySalesTotal() {
    return this.adminsService.getTodaySalesTotal();
  }
}
