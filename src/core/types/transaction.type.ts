import { QueryRunner } from 'typeorm';

export type Branded<T, U> = T & { __brand?: U };

export type Transaction = Branded<QueryRunner, 'Transaction'>;
