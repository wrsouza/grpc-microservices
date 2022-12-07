import * as dotenv from 'dotenv';
import { DataSource, DataSourceOptions } from 'typeorm';

dotenv.config({ path: './libs/common/.env' });

const typeOrmConfig = new DataSource({
  type: 'postgres',
  url: process.env.CONNECTION_STRING,
  entities: [`${__dirname}/../schemas/*.schema{.js,.ts}`],
  synchronize: false,
  logging: true,
  migrations: [`${__dirname}/../migrations/**/*{.ts,.js}`],
} as DataSourceOptions);

export default typeOrmConfig;
