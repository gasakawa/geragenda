import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntity } from './base.entity';
import { AddressEntity } from './address.entity';
import { UserEntity } from './user.entity';

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

  @Column({
    name: 'avatar_url',
    type: 'text',
    nullable: true,
  })
  avatarUrl?: string;

  @OneToMany(() => AddressEntity, address => address.tenant)
  @JoinColumn({
    name: 'address_id',
    referencedColumnName: 'id',
  })
  addresses: AddressEntity[];

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
