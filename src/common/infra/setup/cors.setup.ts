import { INestApplication } from '@nestjs/common';
import { AppConfig } from '../config/app.config';

export const corsSetup = (app: INestApplication) => {
  const appConfig = app.get<AppConfig>(AppConfig);

  if (!appConfig.cors.isEnabled) {
    return;
  }

  app.enableCors({
    credentials: true,
    preflightContinue: false,
    optionsSuccessStatus: 204,
    origin: appConfig.cors.origin,
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
  });
};
