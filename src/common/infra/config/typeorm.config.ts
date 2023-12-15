import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigType, registerAs } from '@nestjs/config';

export const config = registerAs<TypeOrmModuleOptions>('typeorm', () => ({
  type: 'postgres',
  port: Number(process.env.DB_PORT) || 5432,
  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  autoLoadEntities: true,
  synchronize: false,
  logging: process.env.LOG_DB === 'true',

  // uncomment when use local database
  pool: {
    max: 100,
  },
  extra: {
    trustServerCertificate: true,
  },
}));

export default config;
export const TypeOrmConfig = config.KEY;
export type TypeOrmConfig = ConfigType<typeof config>;
