import { Injectable } from '@nestjs/common';
import { BaseRepository } from './base.repository';
import { UserEntity } from '@/core/domain/entities/user.entity';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

@Injectable()
export class UserRepository extends BaseRepository<UserEntity> {
  constructor(
    @InjectDataSource()
    protected datasource: DataSource,
  ) {
    super(datasource);
  }

  getEntityClass() {
    return UserEntity;
  }
}
