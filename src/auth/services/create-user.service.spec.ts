import { CognitoProvider } from '@/core/infra/aws/providers';
import { Test, TestingModule } from '@nestjs/testing';
import { CreateUserService } from './create-user.service';
import { UserRepository } from '@/core/infra/db/repositories/user.repository';
import {
  TransactionMock,
  baseRepoMock,
} from '@/core/infra/db/repositories/__mocks__/base-repository.mock';
import { UserEntity } from '@/core/domain/entities/user.entity';
import { SignupUserRequestDto, SignupUserResponseDto } from '../dto';
import { faker } from '@faker-js/faker';
import { BadRequestException } from '@nestjs/common';
import { getErrorMessage } from '@/common/messages/handle.message';
import { MessageKeyEnum, ModuleEnum } from '@/core/types/enums';

describe('CreateUserService', () => {
  let sut: CreateUserService;
  let cognitoProvider: CognitoProvider;
  let userRepo: UserRepository;

  const fakeTx = new TransactionMock();
  let fakeDto: SignupUserRequestDto;
  let fakeResponse: SignupUserResponseDto;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        { provide: CognitoProvider, useValue: { signup: jest.fn() } },
        { provide: UserRepository, useValue: { ...baseRepoMock } },
        CreateUserService,
      ],
    }).compile();

    cognitoProvider = module.get<CognitoProvider>(CognitoProvider);
    userRepo = module.get<UserRepository>(UserRepository);
    sut = module.get<CreateUserService>(CreateUserService);
  });

  beforeEach(() => {
    fakeDto = {
      email: faker.internet.email(),
      name: faker.person.fullName(),
      role: faker.number.int(),
      mobileNumber: faker.phone.number(),
    };

    fakeResponse = {
      userSub: faker.string.uuid(),
      isConfirmed: false,
      isActive: false,
    };
  });

  it('should throw if the email already exists', async () => {
    jest.spyOn(userRepo, 'startTrx').mockResolvedValueOnce(fakeTx);
    jest
      .spyOn(userRepo, 'findOne')
      .mockResolvedValueOnce({ id: 123 } as UserEntity);

    expect(sut.execute(fakeDto)).rejects.toThrow(
      new BadRequestException(
        getErrorMessage(ModuleEnum.AUTH, MessageKeyEnum.EMAIL_ALREADY_USED),
      ),
    );
  });

  it('should create user in database and cognito', async () => {
    jest.spyOn(userRepo, 'startTrx').mockResolvedValueOnce(fakeTx);
    jest.spyOn(userRepo, 'findOne').mockResolvedValueOnce(undefined);
    jest.spyOn(userRepo, 'commit').mockResolvedValueOnce(undefined);
    jest.spyOn(userRepo, 'rollback').mockResolvedValueOnce(undefined);
    jest.spyOn(cognitoProvider, 'signup').mockResolvedValueOnce(fakeResponse);
    jest.spyOn(userRepo, 'save').mockResolvedValueOnce(null);

    const response = await sut.execute(fakeDto);

    expect(response).toEqual(fakeResponse);
    expect(userRepo.save).toHaveBeenCalledWith(
      {
        fullName: fakeDto.name,
        email: fakeDto.email,
        tenantId: fakeDto.tenant ?? null,
        mobileNumber: fakeDto.mobileNumber,
        sub: fakeResponse.userSub,
      },
      fakeTx,
    );
    expect(userRepo.commit).toHaveBeenCalled();
    expect(userRepo.rollback).not.toHaveBeenCalled();
  });
});
