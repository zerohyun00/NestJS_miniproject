import { createAdmin } from './create-admin.seed';
import { AppDataSource } from 'src/db/data-source';

async function runSeeds() {
  const dataSource = await AppDataSource.initialize();

  console.log('Seeding 진행중');
  await createAdmin(dataSource);
  console.log('Seeding 완료');

  await dataSource.destroy();
}

runSeeds().catch((error) => {
  console.error('Error while running seeds:', error);
  process.exit(1);
});
