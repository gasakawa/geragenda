import { Column, Entity, JoinColumn, OneToMany } from 'typeorm';
import { BaseEntity } from './base.entity';
import { AddressEntity } from './address.entity';

@Entity({
  name: 'tenants',
  schema: 'config',
})
export class TenantEntity extends BaseEntity {
  @Column({
    type: 'text',
  })
  name: string;

  @Column({
    default: true,
    name: 'is_active',
  })
  isActive: boolean;

  @Column({
    name: 'cnpj',
    type: 'text',
    nullable: true,
  })
  cnpj?: string;

  @OneToMany(() => AddressEntity, address => address.tenant)
  @JoinColumn({
    name: 'address_id',
    referencedColumnName: 'id',
  })
  addresses: AddressEntity[];
}
