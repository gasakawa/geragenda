//import { ConfigService } from '@nestjs/config';
import { DataSource, DataSourceOptions } from 'typeorm';
import { config } from 'dotenv';
import { resolve } from 'path';

config();

const entitiesRoot = resolve(__dirname, '..', '..', '..', 'domain', 'entities');

const options: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [entitiesRoot + '**/*.entity{.ts,.js}'],
  migrations: [resolve(__dirname, '..', 'migrations/*{.ts,.js}')],
};

export const typeOrmConfig = new DataSource(options);
