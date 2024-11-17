import { DataSource } from 'typeorm';
import { AdminsModel } from 'src/admins/entities/admin.entity';
import * as bcrypt from 'bcrypt';
import * as dotenv from 'dotenv';

dotenv.config();

export async function createAdmin(dataSource: DataSource) {
  const adminRepository = dataSource.getRepository(AdminsModel);

  const adminEmail = process.env.ADMIN_EMAIL;
  const adminPassword = process.env.ADMIN_PASSWORD;

  const adminData = {
    email: adminEmail,
    password: await bcrypt.hash(adminPassword, 10),
  };

  const existingAdmin = await adminRepository.findOneBy({
    email: adminData.email,
  });
  if (existingAdmin) {
    console.log('이미 존재하는 계정 입니다!');
    return;
  }

  // 관리자 계정 생성
  const newAdmin = adminRepository.create(adminData);
  await adminRepository.save(newAdmin);
  console.log('어드민 계정 생성 완료');
}
