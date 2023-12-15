import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { InfraModule } from './common/infra/infra.module';

@Module({
  imports: [InfraModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
