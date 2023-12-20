import { Injectable } from '@nestjs/common';
import { BaseRepository } from './base.repository';
import { UserEntity } from '@/core/domain/entities/user.entity';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { Transaction } from '@/core/types';

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

  async confirmUser(email: string, tx: Transaction) {
    tx.manager.update(
      UserEntity,
      { email },
      { isConfirmed: true, isActive: true },
    );
  }
}
