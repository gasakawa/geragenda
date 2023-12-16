import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from './base.entity';
import { TenantEntity } from './tenant.entity';

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
}
