import { Column, Entity, OneToMany } from 'typeorm';
import { BaseEntity } from './base.entity';
import { TenantServiceEntity } from './tenant-service.entity';

@Entity({
  name: 'categories',
  schema: 'config',
})
export class CategoryEntity extends BaseEntity {
  @Column({
    type: 'text',
  })
  name: string;

  @Column({
    type: 'text',
    nullable: true,
  })
  description?: string;

  @OneToMany(() => TenantServiceEntity, service => service.category)
  services: TenantServiceEntity[];
}
