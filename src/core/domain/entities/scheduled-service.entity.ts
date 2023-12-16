import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from './base.entity';
import { UserEntity } from './user.entity';
import { TenantEntity } from './tenant.entity';
import { TenantServiceEntity } from './tenant-service.entity';

@Entity({
  name: 'schedule_services',
  schema: 'app',
})
export class ScheduledServiceEntity extends BaseEntity {
  @Column({
    name: 'client_id',
    type: 'int8',
  })
  clientId: number;

  @Column({
    name: 'tenant_id',
    type: 'int8',
  })
  tenantId: number;

  @Column({
    name: 'staff_id',
    type: 'int8',
  })
  staffId: number;

  @Column({
    name: 'tenant_service_id',
    type: 'int8',
  })
  tenantServiceId: number;

  @Column({
    name: 'date_scheduled',
    type: 'time with time zone',
  })
  dateScheduled: Date;

  @ManyToOne(() => UserEntity)
  @JoinColumn({
    name: 'client_id',
    referencedColumnName: 'id',
  })
  client: UserEntity;

  @ManyToOne(() => UserEntity)
  @JoinColumn({
    name: 'staff_id',
    referencedColumnName: 'id',
  })
  staff: UserEntity;

  @ManyToOne(() => TenantEntity)
  @JoinColumn({
    name: 'tenant_id',
    referencedColumnName: 'id',
  })
  tenant: TenantEntity;

  @ManyToOne(() => TenantServiceEntity)
  @JoinColumn({
    name: 'tenant_service_id',
    referencedColumnName: 'id',
  })
  tenantService: TenantServiceEntity;
}
