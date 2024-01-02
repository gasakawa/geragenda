import { CognitoProvider } from '@/core/infra/aws/providers';
import { UserRepository } from '@/core/infra/db/repositories/user.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ForgotPasswordService {
  constructor(
    private readonly cognitoProvider: CognitoProvider,
    private readonly userRepo: UserRepository,
  ) {}

  async execute(email: string) {
    const tx = await this.userRepo.startTrx();

    try {
      const user = await this.userRepo.findOne({ email }, tx);

      if (user) {
        await this.cognitoProvider.forgotPassword(user.sub);
      }

      await this.userRepo.commit(tx);
    } catch (error) {
      await this.userRepo.rollback(tx);
      throw error;
    }
  }
}
