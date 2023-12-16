import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from './base.entity';
import { TenantEntity } from './tenant.entity';
import { UserEntity } from './user.entity';
import { TenantServiceEntity } from './tenant-service.entity';

@Entity({
  name: 'schedules',
  schema: 'app',
})
export class ScheduleEntity extends BaseEntity {
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
    nullable: true,
  })
  tenantServiceId?: number;

  @Column({
    name: 'date_scheduled',
    type: 'timestamp with time zone',
  })
  dateScheduled: Date;

  @Column({
    name: 'is_available',
    default: true,
  })
  isAvailable: boolean;

  @ManyToOne(() => TenantEntity)
  @JoinColumn({
    name: 'tenant_id',
    referencedColumnName: 'id',
  })
  tenant: TenantEntity;

  @ManyToOne(() => UserEntity)
  @JoinColumn({
    name: 'staff_id',
    referencedColumnName: 'id',
  })
  staff: UserEntity;

  @ManyToOne(() => TenantServiceEntity, { nullable: true })
  @JoinColumn({
    name: 'tenant_service_id',
    referencedColumnName: 'id',
  })
  tenantService?: TenantServiceEntity;
}
