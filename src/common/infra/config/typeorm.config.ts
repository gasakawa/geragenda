import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigType, registerAs } from '@nestjs/config';

import { UserEntity } from '@/core/domain/entities/user.entity';
import { RoleEntity } from '@/core/domain/entities/role.entity';
import { TenantEntity } from '@/core/domain/entities/tenant.entity';
import { AddressEntity } from '@/core/domain/entities/address.entity';
import { CategoryEntity } from '@/core/domain/entities/category.entity';
import { PlanEntity } from '@/core/domain/entities/plan.entity';
import { ScheduleEntity } from '@/core/domain/entities/schedule.entity';
import { ScheduledServiceEntity } from '@/core/domain/entities/scheduled-service.entity';
import { TenantServiceEntity } from '@/core/domain/entities/tenant-service.entity';

export const config = registerAs<TypeOrmModuleOptions>('typeorm', () => ({
  type: 'postgres',
  port: Number(process.env.DB_PORT) || 5432,
  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: false,
  logging: process.env.LOG_DB === 'true',
  entities: [
    UserEntity,
    RoleEntity,
    TenantEntity,
    AddressEntity,
    CategoryEntity,
    PlanEntity,
    RoleEntity,
    ScheduleEntity,
    ScheduledServiceEntity,
    TenantServiceEntity,
  ],
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
