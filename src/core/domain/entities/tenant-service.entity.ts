import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from './base.entity';
import { CategoryEntity } from './category.entity';
import { TenantEntity } from './tenant.entity';

@Entity({
  name: 'tenant_services',
  schema: 'config',
})
export class TenantServiceEntity extends BaseEntity {
  @Column({
    type: 'text',
  })
  name: string;

  @Column({
    type: 'numeric',
    default: 0,
    scale: 2,
    precision: 18,
  })
  price: number;

  @Column({
    type: 'numeric',
    default: 0,
    scale: 2,
    precision: 18,
    nullable: true,
  })
  discount?: number;

  @Column({
    type: 'numeric',
    default: 0,
    scale: 2,
    precision: 18,
  })
  duration: number;

  @Column({
    type: 'int',
    nullable: true,
    name: 'category_id',
  })
  categoryId?: number;

  @ManyToOne(() => CategoryEntity, category => category.services, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  @JoinColumn({
    name: 'category_id',
    referencedColumnName: 'id',
  })
  category?: CategoryEntity;

  @ManyToOne(() => TenantEntity)
  @JoinColumn({
    name: 'tenant_id',
    referencedColumnName: 'id',
  })
  tenant: TenantEntity;
}
