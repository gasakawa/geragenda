import { INestApplication, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { corsSetup } from './cors.setup';
import { swaggerSetup } from './swagger.setup';
import { HttpExceptionFilter } from '@/core/filters/http-exception.filter';

export const apiSetup = async (app: INestApplication) => {
  const config = app.get<ConfigService>(ConfigService);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  app.useGlobalFilters(new HttpExceptionFilter(config));

  corsSetup(app);
  swaggerSetup(app);
};
