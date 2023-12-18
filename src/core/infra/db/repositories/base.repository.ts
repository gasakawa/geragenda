import { Transaction } from '@/core/types';
import {
  DataSource,
  DeleteResult,
  FindManyOptions,
  FindOneOptions,
  Repository,
  FindOptionsWhere,
  SaveOptions,
  UpdateResult,
} from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

export abstract class BaseRepository<T> {
  protected repository: Repository<T>;

  constructor(protected datasource: DataSource) {
    this.repository = this.datasource.getRepository(this.getEntityClass());
  }

  abstract getEntityClass(): any;

  find(entity: Partial<T>): Promise<T[]> {
    return this.repository.manager.find(this.getEntityClass(), {
      where: entity,
    } as FindManyOptions<T>);
  }

  findBy(where: FindOptionsWhere<T> | FindOptionsWhere<T>[]): Promise<T[]> {
    return this.repository.manager.findBy(this.getEntityClass(), where);
  }

  findOne(entity: Partial<T>): Promise<T> {
    return this.repository.manager.findOne(this.getEntityClass(), {
      where: entity,
    } as FindOneOptions<T>);
  }

  findAll(): Promise<T[]> {
    return this.repository.manager.find(this.getEntityClass());
  }

  save(entity: T, options?: SaveOptions, tx?: Transaction): Promise<T>;
  save(entities: T[], options?: SaveOptions, tx?: Transaction): Promise<T[]>;
  async save(
    entityOrEntities: T | T[],
    options?: SaveOptions,
    tx?: Transaction,
  ): Promise<T | T[]> {
    const manager = tx ? tx.manager : this.repository.manager;
    return manager.save<T | T[]>(entityOrEntities, {
      ...options,
      transaction: !tx,
    });
  }

  async update(
    criteria: number | string | number[] | string[],
    data: QueryDeepPartialEntity<T>,
    tx?: Transaction,
  ): Promise<UpdateResult> {
    const manager = tx ? tx.manager : this.repository.manager;

    return manager.update(this.getEntityClass(), criteria, data);
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

  async commitTrx(tx: Transaction): Promise<void> {
    await tx.commitTransaction();
    await tx.release();
  }

  async rollbackTrx(tx: Transaction): Promise<void> {
    await tx.rollbackTransaction();
    await tx.release();
  }
}
