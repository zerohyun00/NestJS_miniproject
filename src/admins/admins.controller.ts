import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AdminsService } from './admins.service';
import { AdminsLoginDto } from './dto/login-admin.dto';
import { AdminGuard } from './guard/admins.guard';

@Controller('admin')
export class AdminsController {
  constructor(private readonly adminsService: AdminsService) {}

  @Post('login')
  async login(@Body() adminLoginDto: AdminsLoginDto) {
    console.log('Admin Login DTO:', adminLoginDto);
    return this.adminsService.login(adminLoginDto);
  }
}
