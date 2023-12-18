import { CognitoProvider } from '@/core/infra/aws/providers';
import { UserRepository } from '@/core/infra/db/repositories/user.repository';
import { Injectable } from '@nestjs/common';
import { SignupUserRequestDto } from '../dto';
import { UserEntity } from '@/core/domain/entities/user.entity';

@Injectable()
export class CreateUserService {
  constructor(
    private readonly cognitoProvider: CognitoProvider,
    private readonly userRepo: UserRepository,
  ) {}

  async execute(data: SignupUserRequestDto) {
    const tx = await this.userRepo.startTrx();
    try {
      const { userSub } = await this.cognitoProvider.signup(data);

      if (userSub) {
        const user = new UserEntity();
        Object.assign(user, {
          name: data.name,
          email: data.email,
          tenantId: data.tenant ?? null,
        });

        const userInserted = await this.userRepo.save(user, tx);
        await tx.commitTransaction();
        return userInserted;
      }
    } catch (error) {
      await tx.rollbackTransaction();
      throw error;
    }
  }
}
