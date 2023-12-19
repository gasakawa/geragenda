export const BaseRepositoryMock = jest.fn().mockImplementation(() => ({
  findAll: jest.fn(),
  findOne: jest.fn(),
  find: jest.fn(),
  save: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
  startTrx: jest.fn(),
  commit: jest.fn(),
  rollback: jest.fn(),
}));

export const TransactionMock = jest.fn().mockImplementation(() => ({
  commitTransaction: jest.fn(),
  rollbackTransaction: jest.fn(),
  startTransaction: jest.fn(),
}));

export const baseRepoMock = new BaseRepositoryMock();
