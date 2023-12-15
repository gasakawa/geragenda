import { Entity } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity({
  schema: 'config',
  name: 'tenants',
})
export class TenantEntity extends BaseEntity {}
