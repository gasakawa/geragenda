import { Transaction } from '@/core/types';
import {
  DataSource,
  DeleteResult,
  FindManyOptions,
  FindOneOptions,
  Repository,
  FindOptionsWhere,
  UpdateResult,
} from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

export abstract class BaseRepository<T> {
  protected repository: Repository<T>;

  constructor(protected datasource: DataSource) {
    this.repository = this.datasource.getRepository(this.getEntityClass());
  }

  abstract getEntityClass(): any;

  find(entity: Partial<T>, tx?: Transaction): Promise<T[]> {
    const manager = tx ? tx.manager : this.repository.manager;
    return manager.find(this.getEntityClass(), {
      where: entity,
    } as FindManyOptions<T>);
  }

  findBy(where: FindOptionsWhere<T>, tx?: Transaction): Promise<T[]> {
    const manager = tx ? tx.manager : this.repository.manager;
    return manager.findBy(this.getEntityClass(), where);
  }

  findOne(entity: Partial<T>, tx?: Transaction): Promise<T> {
    const manager = tx ? tx.manager : this.repository.manager;
    return manager.findOne(this.getEntityClass(), {
      where: entity,
    } as FindOneOptions<T>);
  }

  findAll(): Promise<T[]> {
    return this.repository.manager.find(this.getEntityClass());
  }

  save(entity: T, tx?: Transaction): Promise<T>;
  save(entities: T[], tx?: Transaction): Promise<T[]>;
  async save(entityOrEntities: T | T[], tx?: Transaction): Promise<T | T[]> {
    const manager = tx ? tx.manager : this.repository.manager;
    return manager.save<T | T[]>(entityOrEntities);
  }

  async update(
    criteria: number | string | number[] | string[],
    data: QueryDeepPartialEntity<T>,
    tx?: Transaction,
  ): Promise<UpdateResult> {
    const manager = tx ? tx.manager : this.repository.manager;

    return manager.update<T>(this.getEntityClass(), criteria, data);
  }

  delete(keys: Partial<T>, tx?: Transaction): Promise<DeleteResult> {
    const manager = tx ? tx.manager : this.repository.manager;

    return manager.delete(this.getEntityClass(), keys);
  }

  async startTrx(): Promise<Transaction> {
    const queryRunner = this.datasource.createQueryRunner();
    await queryRunner.startTransaction();

    return queryRunner;
  }

  async commit(tx: Transaction): Promise<void> {
    await tx.commitTransaction();
    await tx.release();
  }

  async rollback(tx: Transaction): Promise<void> {
    await tx.rollbackTransaction();
    await tx.release();
  }
}
