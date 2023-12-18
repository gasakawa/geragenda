import { NestFactory } from '@nestjs/core';
import { Type, Logger } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { json } from 'express';
import { AppConfig } from './infra/config/app.config';
import { apiSetup } from './infra/setup/api.setup';
import { join } from 'path';

const STATIC_FILE_PATH = join(__dirname, '../../../public');

export const bootstrap = async <T>(AppModule: Type<T>) => {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const appConfig = app.get<AppConfig>(AppConfig);

  app.use(json({ limit: '1mb' }));
  app.useStaticAssets(STATIC_FILE_PATH);

  apiSetup(app);

  await app.listen(appConfig.port, () => {
    Logger.log(`server listen on port ${appConfig.port}`);
  });
};
