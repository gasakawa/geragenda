import { Injectable } from '@nestjs/common';
import { CognitoProvider } from '@/core/infra/aws/providers';
import { UserRepository } from '@/core/infra/db/repositories/user.repository';

@Injectable()
export class ConfirmUserService {
  constructor(
    private readonly cognitoProvider: CognitoProvider,
    private readonly userRepo: UserRepository,
  ) {}

  async execute(email: string, code: string): Promise<void> {
    const tx = await this.userRepo.startTrx();

    try {
      const user = await this.userRepo.findOne({ email }, tx);

      if (user) {
        await this.cognitoProvider.confirmSignup(user.sub, code);
        await this.userRepo.confirmUser(email, tx);
      }

      await this.userRepo.commit(tx);
    } catch (error) {
      await this.userRepo.rollback(tx);
      throw error;
    }
  }
}
