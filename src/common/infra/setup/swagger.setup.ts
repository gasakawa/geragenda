import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppConfig } from '../config/app.config';
import * as path from 'node:path';
import { writeFileSync } from 'fs';
import * as YAML from 'yaml';

export const swaggerSetup = (app: INestApplication) => {
  const appConfig = app.get<AppConfig>(AppConfig);

  if (!appConfig.swagger.isEnabled) {
    return;
  }

  const config = new DocumentBuilder()
    .setTitle('Geragenda API')
    .setDescription('GerAgenda System')
    .addBearerAuth()
    .setVersion('1.0.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  const outputPath = path.resolve(
    process.cwd(),
    'public',
    'docs',
    'openapi.spec.yaml',
  );
  writeFileSync(outputPath, YAML.stringify(document), { encoding: 'utf8' });
};
