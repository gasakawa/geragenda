import { Transaction } from '@/core/types';
import {
  DataSource,
  DeleteResult,
  FindManyOptions,
  FindOneOptions,
  Repository,
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
  findOne(entity: Partial<T>): Promise<T> {
    return this.repository.manager.findOne(this.getEntityClass(), {
      where: entity,
    } as FindOneOptions<T>);
  }
  findAll(): Promise<T[]> {
    return this.repository.manager.find(this.getEntityClass());
  }
  async save(entityOrEntities: T | T[], tx?: Transaction): Promise<T | T[]> {
    const qb = tx
      ? tx.manager.createQueryBuilder().insert()
      : this.repository.manager
          .createQueryBuilder()
          .useTransaction(true)
          .insert();
    const result = await qb
      .into(this.getEntityClass())
      .values(entityOrEntities)
      .returning('*')
      .execute();
    return result.generatedMaps.length > 1
      ? (result.generatedMaps as T[])
      : (result.generatedMaps[0] as T);
  }
  update(
    id: number | string,
    data: QueryDeepPartialEntity<T>,
    tx?: Transaction,
  ): Promise<UpdateResult> {
    const manager = tx ? tx.manager : this.repository.manager;
    return manager.update(this.getEntityClass(), id, data);
  }
  delete(id: number | string, tx?: Transaction): Promise<DeleteResult> {
    const manager = tx ? tx.manager : this.repository.manager;
    return manager.delete(this.getEntityClass(), id);
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
