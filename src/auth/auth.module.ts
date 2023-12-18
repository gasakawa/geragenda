import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { UserRepository } from '@/core/infra/db/repositories/user.repository';
import { CreateUserService } from './services';
import { CognitoProvider } from '@/core/infra/aws/providers';

@Module({
  controllers: [AuthController],
  providers: [UserRepository, CreateUserService, CognitoProvider],
})
export class AuthModule {}
