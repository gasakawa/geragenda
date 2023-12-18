import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from './base.entity';
import { TenantEntity } from './tenant.entity';
import { UserEntity } from './user.entity';

@Entity({
  name: 'addresses',
  schema: 'config',
})
export class AddressEntity extends BaseEntity {
  @Column({
    type: 'text',
  })
  street: string;

  @Column({
    type: 'int4',
  })
  number: number;

  @Column({
    type: 'text',
    nullable: true,
  })
  zipCode?: string;

  @Column({
    type: 'text',
    nullable: true,
  })
  neighborhood?: string;

  @Column({
    type: 'text',
    nullable: true,
  })
  city?: string;

  @Column({
    type: 'text',
    nullable: true,
  })
  state?: string;

  @ManyToOne(() => TenantEntity, tenant => tenant.addresses)
  @JoinColumn({
    name: 'tenant_id',
    referencedColumnName: 'id',
  })
  tenant: TenantEntity;

  @ManyToOne(() => UserEntity, { onDelete: 'RESTRICT' })
  @JoinColumn({
    name: 'created_by_id',
    referencedColumnName: 'id',
  })
  createdBy: UserEntity;

  @ManyToOne(() => UserEntity, { onDelete: 'RESTRICT' })
  @JoinColumn({
    name: 'deleted_by_id',
    referencedColumnName: 'id',
  })
  deletedBy: UserEntity;
}
