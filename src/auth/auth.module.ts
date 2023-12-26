import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { UserRepository } from '@/core/infra/db/repositories/user.repository';
import {
  AuthenticateUserService,
  ChangeInitialPasswordService,
  CreateUserService,
} from './services';
import {
  CognitoProvider,
  CognitoProviderKey,
} from '@/core/infra/aws/providers';
import { ConfigService } from '@nestjs/config';
import { buildCognitoProviderInstance } from '@/core/infra/aws/providers/aws.provider';

@Module({
  imports: [],
  controllers: [AuthController],
  providers: [
    UserRepository,
    CreateUserService,
    CognitoProvider,
    ChangeInitialPasswordService,
    AuthenticateUserService,
    {
      provide: CognitoProviderKey,
      inject: [ConfigService],
      useFactory: (config: ConfigService) =>
        buildCognitoProviderInstance(config),
    },
  ],
})
export class AuthModule {}
