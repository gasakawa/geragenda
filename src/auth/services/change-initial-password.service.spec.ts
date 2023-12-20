import { CognitoProvider } from '@/core/infra/aws/providers';
import { Test, TestingModule } from '@nestjs/testing';
import { ChangeInitialPasswordService } from './change-initial-password.service';
import { UserRepository } from '@/core/infra/db/repositories/user.repository';
import { TransactionMock } from '@/core/infra/db/repositories/__mocks__/base-repository.mock';
import { UserEntity } from '@/core/domain/entities/user.entity';

import { faker } from '@faker-js/faker';
import { BadRequestException } from '@nestjs/common';
import { getErrorMessage } from '@/common/messages/handle.message';
import { MessageKeyEnum, ModuleEnum } from '@/core/types/enums';
import { ChangeInitialPasswordRequestDto } from '../dto/change-initial-password-request.dto';
import { SignInUserResponseDto } from '../dto';

jest.mock('@/core/infra/db/repositories/user.repository');

describe('ChangeInitialPasswordService', () => {
  let sut: ChangeInitialPasswordService;
  let cognitoProvider: CognitoProvider;
  let userRepo: UserRepository;

  const fakeTx = new TransactionMock();
  let fakeDto: ChangeInitialPasswordRequestDto;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: CognitoProvider,
          useValue: {
            signIn: jest.fn(),
            changeInitialPassword: jest.fn(),
          },
        },
        UserRepository,
        ChangeInitialPasswordService,
      ],
    }).compile();

    cognitoProvider = module.get<CognitoProvider>(CognitoProvider);
    userRepo = module.get<UserRepository>(UserRepository);
    sut = module.get<ChangeInitialPasswordService>(
      ChangeInitialPasswordService,
    );
  });

  beforeEach(() => {
    fakeDto = {
      username: faker.internet.email(),
      password: faker.string.alphanumeric({ length: 8 }),
      tempPassword: faker.string.alphanumeric({ length: 8 }),
    };
  });

  it('should throw if user is already confirmed', async () => {
    jest.spyOn(userRepo, 'startTrx').mockResolvedValueOnce(fakeTx);
    jest
      .spyOn(userRepo, 'findOne')
      .mockResolvedValueOnce({ id: 123, isConfirmed: true } as UserEntity);

    expect(sut.execute(fakeDto)).rejects.toThrow(
      new BadRequestException(
        getErrorMessage(ModuleEnum.AUTH, MessageKeyEnum.USER_ALREADY_CONFIRMED),
      ),
    );
  });

  it('should throw if user is not found', async () => {
    jest.spyOn(userRepo, 'startTrx').mockResolvedValueOnce(fakeTx);
    jest.spyOn(userRepo, 'findOne').mockResolvedValueOnce(null);

    expect(sut.execute(fakeDto)).rejects.toThrow(
      new BadRequestException(
        getErrorMessage(ModuleEnum.AUTH, MessageKeyEnum.USER_NOT_FOUND),
      ),
    );
  });

  it('should throw if temporary password is wrong', async () => {
    jest.spyOn(userRepo, 'startTrx').mockResolvedValueOnce(fakeTx);
    jest
      .spyOn(userRepo, 'findOne')
      .mockResolvedValueOnce({ id: 123, isConfirmed: false } as UserEntity);
    jest.spyOn(cognitoProvider, 'signIn').mockResolvedValueOnce({
      accessToken: faker.string.alphanumeric(),
    } as SignInUserResponseDto);

    expect(sut.execute(fakeDto)).rejects.toThrow(
      new BadRequestException(
        getErrorMessage(
          ModuleEnum.AUTH,
          MessageKeyEnum.WRONG_TEMPORARY_PASSWORD,
        ),
      ),
    );
  });

  it('should confirm user and change its password', async () => {
    const fakeSub = faker.string.uuid();
    jest.spyOn(userRepo, 'startTrx').mockResolvedValueOnce(fakeTx);
    jest.spyOn(userRepo, 'findOne').mockResolvedValueOnce({
      id: 123,
      isConfirmed: false,
      sub: fakeSub,
    } as UserEntity);
    jest.spyOn(userRepo, 'commit').mockResolvedValueOnce(undefined);
    jest.spyOn(userRepo, 'rollback').mockResolvedValueOnce(undefined);
    jest.spyOn(cognitoProvider, 'signIn').mockResolvedValueOnce({
      accessToken: 'NO_RESULT',
    } as SignInUserResponseDto);
    jest
      .spyOn(cognitoProvider, 'changeInitialPassword')
      .mockResolvedValueOnce(null);
    jest.spyOn(userRepo, 'confirmUser').mockResolvedValueOnce(null);

    await sut.execute(fakeDto);

    expect(userRepo.confirmUser).toHaveBeenCalledWith(fakeDto.username, fakeTx);
    expect(cognitoProvider.changeInitialPassword).toHaveBeenCalledWith(
      fakeDto.username,
      fakeDto.password,
    );
    expect(cognitoProvider.signIn).toHaveBeenCalledWith(
      fakeSub,
      fakeDto.tempPassword,
    );
    expect(userRepo.commit).toHaveBeenCalled();
    expect(userRepo.rollback).not.toHaveBeenCalled();
  });
});
