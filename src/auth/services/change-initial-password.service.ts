import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CognitoProvider } from '@/core/infra/aws/providers';
import { UserRepository } from '@/core/infra/db/repositories/user.repository';
import { ChangeInitialPasswordRequestDto } from '../dto/change-initial-password-request.dto';
import { getErrorMessage } from '@/common/messages/handle.message';
import { MessageKeyEnum, ModuleEnum } from '@/core/types/enums';

@Injectable()
export class ChangeInitialPasswordService {
  constructor(
    private readonly cognitoProvider: CognitoProvider,
    private readonly userRepo: UserRepository,
  ) {}

  async execute(dto: ChangeInitialPasswordRequestDto) {
    const tx = await this.userRepo.startTrx();
    try {
      const user = await this.userRepo.findOne({ email: dto.username }, tx);

      if (!user) {
        throw new NotFoundException(
          getErrorMessage(ModuleEnum.AUTH, MessageKeyEnum.USER_NOT_FOUND),
        );
      }

      if (user.isConfirmed) {
        throw new BadRequestException(
          getErrorMessage(
            ModuleEnum.AUTH,
            MessageKeyEnum.USER_ALREADY_CONFIRMED,
          ),
        );
      }

      const { accessToken } = await this.cognitoProvider.signIn(
        user.sub,
        dto.tempPassword,
      );

      if (accessToken !== 'NO_RESULT') {
        throw new BadRequestException(
          getErrorMessage(
            ModuleEnum.AUTH,
            MessageKeyEnum.WRONG_TEMPORARY_PASSWORD,
          ),
        );
      }

      await this.cognitoProvider.changeInitialPassword(
        dto.username,
        dto.password,
      );

      await this.userRepo.confirmUser(dto.username, tx);

      await this.userRepo.commit(tx);
    } catch (error) {
      await this.userRepo.rollback(tx);
      throw error;
    }
  }
}
