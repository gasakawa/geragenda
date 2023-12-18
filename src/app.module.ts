import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { InfraModule } from './common/infra/infra.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [InfraModule, AuthModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
