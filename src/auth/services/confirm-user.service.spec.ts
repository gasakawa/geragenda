import { CognitoProvider } from '@/core/infra/aws/providers';
import { Test, TestingModule } from '@nestjs/testing';
import { ConfirmUserService } from './confirm-user.service';
import { UserRepository } from '@/core/infra/db/repositories/user.repository';
import { TransactionMock } from '@/core/infra/db/repositories/__mocks__/base-repository.mock';
import { UserEntity } from '@/core/domain/entities/user.entity';

import { faker } from '@faker-js/faker';

jest.mock('@/core/infra/db/repositories/user.repository');

describe('ConfirmUserService', () => {
  let sut: ConfirmUserService;
  let cognitoProvider: CognitoProvider;
  let userRepo: UserRepository;

  const fakeTx = new TransactionMock();

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: CognitoProvider,
          useValue: {
            signIn: jest.fn(),
            changeInitialPassword: jest.fn(),
            confirmSignup: jest.fn(),
          },
        },
        UserRepository,
        ConfirmUserService,
      ],
    }).compile();

    cognitoProvider = module.get<CognitoProvider>(CognitoProvider);
    userRepo = module.get<UserRepository>(UserRepository);
    sut = module.get<ConfirmUserService>(ConfirmUserService);
  });

  it('should throw if an error occurs', async () => {
    jest.spyOn(userRepo, 'startTrx').mockResolvedValueOnce(fakeTx);
    jest
      .spyOn(userRepo, 'findOne')
      .mockRejectedValueOnce(new Error('An error'));

    expect(
      sut.execute(faker.internet.email(), faker.string.numeric({ length: 6 })),
    ).rejects.toThrow(new Error('An error'));
  });

  it('should confirm the user', async () => {
    const fakeEmail = faker.internet.email();
    const fakeUser = {
      id: 123,
      sub: faker.string.uuid(),
    } as UserEntity;
    jest.spyOn(userRepo, 'startTrx').mockResolvedValueOnce(fakeTx);
    jest.spyOn(cognitoProvider, 'confirmSignup').mockResolvedValueOnce(null);
    jest.spyOn(userRepo, 'findOne').mockResolvedValueOnce(fakeUser);
    jest.spyOn(userRepo, 'confirmUser').mockResolvedValueOnce(null);

    await sut.execute(fakeEmail, '123456');

    expect(userRepo.findOne).toHaveBeenCalledWith({ email: fakeEmail }, fakeTx);
    expect(cognitoProvider.confirmSignup).toHaveBeenCalledWith(
      fakeUser.sub,
      '123456',
    );
  });
});
