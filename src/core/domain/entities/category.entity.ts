import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntity } from './base.entity';
import { TenantServiceEntity } from './tenant-service.entity';
import { UserEntity } from './user.entity';

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
