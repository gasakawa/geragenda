import { CognitoProvider } from '@/core/infra/aws/providers';
import { UserRepository } from '@/core/infra/db/repositories/user.repository';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { SignInUserResponseDto } from '../dto';
import { MessageKeyEnum, ModuleEnum } from '@/core/types/enums';
import { getErrorMessage } from '@/common/messages/handle.message';
import { UserEntity } from '@/core/domain/entities/user.entity';

@Injectable()
export class AuthenticateUserService {
  constructor(
    private readonly cognitoProvider: CognitoProvider,
    private readonly userRepo: UserRepository,
  ) {}

  async execute(
    username: string,
    password: string,
  ): Promise<SignInUserResponseDto> {
    const tx = await this.userRepo.startTrx();

    try {
      const user = await this.userRepo.findOne({ email: username }, tx);

      this.validateUser(user);

      const { accessToken, refreshToken, tokenType, expiresIn } =
        await this.cognitoProvider.signIn(user.sub, password);

      await this.userRepo.commit(tx);

      return {
        accessToken,
        refreshToken,
        tokenType,
        expiresIn,
        tokenData: {
          sub: user.sub,
          name: user.fullName,
          active: user.isActive,
          confirmed: user.isConfirmed,
        },
      };
    } catch (error) {
      await this.userRepo.rollback(tx);
      throw error;
    }
  }

  private validateUser(user: UserEntity) {
    if (!user) {
      throw new NotFoundException(
        getErrorMessage(ModuleEnum.AUTH, MessageKeyEnum.USER_NOT_FOUND),
      );
    }

    if (!user.isConfirmed) {
      throw new BadRequestException(
        getErrorMessage(ModuleEnum.AUTH, MessageKeyEnum.USER_NOT_CONFIRMED),
      );
    }

    if (!user.isActive) {
      throw new BadRequestException(
        getErrorMessage(ModuleEnum.AUTH, MessageKeyEnum.USER_INACTIVE),
      );
    }
  }
}
