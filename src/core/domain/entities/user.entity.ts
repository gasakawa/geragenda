import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
} from 'typeorm';
import { BaseEntity } from './base.entity';
import { RoleEntity } from './role.entity';
import { TenantEntity } from './tenant.entity';

@Entity({
  name: 'users',
  schema: 'config',
})
export class UserEntity extends BaseEntity {
  @Column({
    name: 'full_name',
    type: 'text',
  })
  fullName: string;

  @Column({
    type: 'text',
    unique: true,
  })
  email: string;

  @Column({
    name: 'is_active',
    default: false,
  })
  isActive: boolean;

  @Column({
    name: 'is_confirmed',
    default: false,
  })
  isConfirmed: boolean;

  @Column({
    name: 'mobile_number',
    type: 'text',
  })
  mobileNumber: string;

  @Column({
    name: 'tenant_id',
    type: 'int8',
    nullable: true,
  })
  tenantId?: number;

  @Column({
    name: 'sub',
    type: 'text',
    nullable: true,
  })
  sub?: string;

  @ManyToMany(() => RoleEntity)
  @JoinTable({
    schema: 'config',
    name: 'user_roles',
    joinColumn: {
      name: 'user_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'role_id',
      referencedColumnName: 'id',
    },
  })
  roles: RoleEntity[];

  @ManyToOne(() => TenantEntity, { nullable: true })
  @JoinColumn({
    name: 'tenant_id',
    referencedColumnName: 'id',
  })
  tenant?: TenantEntity;
}
