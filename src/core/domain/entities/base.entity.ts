import {
  CreateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export abstract class BaseEntity {
  @PrimaryGeneratedColumn('identity', { type: 'int8' })
  id: number;

  @CreateDateColumn({
    name: 'created_at',
    type: 'time with time zone',
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'time with time zone',
  })
  updatedAt: Date;

  @DeleteDateColumn({
    type: 'time with time zone',
    name: 'deleted_at',
    nullable: true,
  })
  deletedAt?: Date;
}
