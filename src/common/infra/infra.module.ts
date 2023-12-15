import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { configs } from './config';
import { TypeOrmConfig } from './config/typeorm.config';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      load: configs,
      isGlobal: true,
      envFilePath: ['.env', '.env.development', '.env.production'],
    }),
    TypeOrmModule.forRootAsync({
      inject: [TypeOrmConfig],
      useFactory: (config: TypeOrmConfig) => config,
    }),
  ],
  providers: [],
  exports: [],
})
export class InfraModule {}
