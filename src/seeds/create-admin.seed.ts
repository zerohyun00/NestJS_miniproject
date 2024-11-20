import { DataSource } from 'typeorm';
import { AdminsModel } from 'src/admins/entities/admin.entity';
import * as bcrypt from 'bcrypt';
import * as dotenv from 'dotenv';
import { RolesEnum } from 'src/common/const/roles.const';

dotenv.config();

export async function createAdmin(dataSource: DataSource) {
  const adminRepository = dataSource.getRepository(AdminsModel);

  const adminEmail = process.env.ADMIN_EMAIL;
  const adminPassword = process.env.ADMIN_PASSWORD;

  const adminData = {
    email: adminEmail,
    password: await bcrypt.hash(adminPassword, 10),
    role: RolesEnum.ADMIN,
  };

  const existingAdmin = await adminRepository.findOneBy({
    email: adminData.email,
  });
  if (existingAdmin) {
    return;
  }

  const newAdmin = adminRepository.create(adminData);
  await adminRepository.save(newAdmin);
}
