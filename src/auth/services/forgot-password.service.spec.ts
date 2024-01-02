import { CognitoProvider } from '@/core/infra/aws/providers';
import { ForgotPasswordService } from '.';
import { UserRepository } from '@/core/infra/db/repositories/user.repository';
import { Test, TestingModule } from '@nestjs/testing';
import { TransactionMock } from '@/core/infra/db/repositories/__mocks__/base-repository.mock';
import { faker } from '@faker-js/faker';
import { UserEntity } from '@/core/domain/entities/user.entity';

jest.mock('@/core/infra/db/repositories/user.repository');

describe('ForgotPasswordService', () => {
  let sut: ForgotPasswordService;
  let cognitoProvider: CognitoProvider;
  let userRepo: UserRepository;

  const fakeTx = new TransactionMock();

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: CognitoProvider,
          useValue: {
            forgotPassword: jest.fn(),
          },
        },
        UserRepository,
        ForgotPasswordService,
      ],
    }).compile();

    cognitoProvider = module.get<CognitoProvider>(CognitoProvider);
    userRepo = module.get<UserRepository>(UserRepository);
    sut = module.get<ForgotPasswordService>(ForgotPasswordService);
  });

  it('should do nothing if user not found', async () => {
    jest.spyOn(userRepo, 'findOne').mockResolvedValueOnce(undefined);

    jest.spyOn(userRepo, 'startTrx').mockResolvedValueOnce(fakeTx);
    jest.spyOn(userRepo, 'commit').mockResolvedValueOnce(undefined);
    jest.spyOn(userRepo, 'rollback').mockResolvedValueOnce(undefined);
    jest
      .spyOn(cognitoProvider, 'forgotPassword')
      .mockResolvedValueOnce(undefined);

    await sut.execute(faker.internet.email());

    expect(userRepo.commit).toHaveBeenCalled();
    expect(userRepo.rollback).not.toHaveBeenCalled();
    expect(userRepo.findOne).toHaveBeenCalled();
    expect(cognitoProvider.forgotPassword).not.toHaveBeenCalled();
  });

  it('should call forgot password', async () => {
    jest
      .spyOn(userRepo, 'findOne')
      .mockResolvedValueOnce({ sub: faker.string.uuid() } as UserEntity);

    jest.spyOn(userRepo, 'startTrx').mockResolvedValueOnce(fakeTx);
    jest.spyOn(userRepo, 'commit').mockResolvedValueOnce(undefined);
    jest.spyOn(userRepo, 'rollback').mockResolvedValueOnce(undefined);
    jest
      .spyOn(cognitoProvider, 'forgotPassword')
      .mockResolvedValueOnce(undefined);

    await sut.execute(faker.internet.email());

    expect(userRepo.commit).toHaveBeenCalled();
    expect(userRepo.rollback).not.toHaveBeenCalled();
    expect(userRepo.findOne).toHaveBeenCalled();
    expect(cognitoProvider.forgotPassword).toHaveBeenCalled();
  });

  it('should rollback if an error occurs', async () => {
    jest
      .spyOn(userRepo, 'findOne')
      .mockRejectedValueOnce(new Error('an error'));

    jest.spyOn(userRepo, 'startTrx').mockResolvedValueOnce(fakeTx);
    jest.spyOn(userRepo, 'commit').mockResolvedValueOnce(undefined);
    jest.spyOn(userRepo, 'rollback').mockResolvedValueOnce(undefined);
    jest
      .spyOn(cognitoProvider, 'forgotPassword')
      .mockResolvedValueOnce(undefined);

    try {
      await sut.execute(faker.internet.email());
    } catch (error) {
      expect(error).toBeDefined();
    }

    expect(userRepo.commit).not.toHaveBeenCalled();
    expect(userRepo.rollback).toHaveBeenCalled();
    expect(userRepo.findOne).toHaveBeenCalled();
    expect(cognitoProvider.forgotPassword).not.toHaveBeenCalled();
  });
});
