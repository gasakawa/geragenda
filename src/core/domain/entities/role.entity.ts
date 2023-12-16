import { Column, Entity } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity({
  name: 'roles',
  schema: 'config',
})
export class RoleEntity extends BaseEntity {
  @Column({
    type: 'text',
  })
  name: string;
}
