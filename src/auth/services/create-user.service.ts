import { CognitoProvider } from '@/core/infra/aws/providers';
import { UserRepository } from '@/core/infra/db/repositories/user.repository';
import { BadRequestException, Injectable } from '@nestjs/common';
import { SignupUserRequestDto, SignupUserResponseDto } from '../dto';
import { UserEntity } from '@/core/domain/entities/user.entity';
import { getErrorMessage } from '@/common/messages/handle.message';
import { MessageKeyEnum, ModuleEnum } from '@/core/types/enums';

@Injectable()
export class CreateUserService {
  constructor(
    private readonly cognitoProvider: CognitoProvider,
    private readonly userRepo: UserRepository,
  ) {}

  async execute(data: SignupUserRequestDto): Promise<SignupUserResponseDto> {
    const tx = await this.userRepo.startTrx();
    try {
      const usr = await this.userRepo.findOne({ email: data.email }, tx);

      if (usr) {
        throw new BadRequestException(
          getErrorMessage(ModuleEnum.AUTH, MessageKeyEnum.EMAIL_ALREADY_USED),
        );
      }

      const tenant = data.tenant ? 'company' : 'customer';

      const { userSub, isActive, isConfirmed } =
        await this.cognitoProvider.signup(
          data.email,
          data.name,
          data.role,
          tenant,
        );

      if (userSub) {
        const user = new UserEntity();
        Object.assign(user, {
          fullName: data.name,
          email: data.email,
          tenantId: data.tenant ?? null,
          mobileNumber: data.mobileNumber,
          sub: userSub,
        });

        await this.userRepo.save(user, tx);
        await this.userRepo.commit(tx);
        return {
          isConfirmed,
          userSub,
          isActive,
        };
      }
    } catch (error) {
      await this.userRepo.rollback(tx);
      throw error;
    }
  }
}
