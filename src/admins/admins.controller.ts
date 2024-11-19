import {
  Body,
  Controller,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AdminsService } from './admins.service';
import { AdminsLoginDto } from './dto/login-admin.dto';
import { LogInterceptor } from 'src/common/interceptor/log.interceptor';

@Controller('admin')
@UseInterceptors(LogInterceptor)
export class AdminsController {
  constructor(private readonly adminsService: AdminsService) {}

  @Post('login')
  async login(@Body() adminLoginDto: AdminsLoginDto) {
    console.log('Admin Login DTO:', adminLoginDto);
    return this.adminsService.login(adminLoginDto);
  }
}
