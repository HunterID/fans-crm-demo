import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import helmet from 'helmet';

import { INestApplication, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);

  await initializeApp(app);
}

const createValidationPipe = (): ValidationPipe => {
  return new ValidationPipe({
    transform: true,
    whitelist: true,
  });
};

const setupCors = (app: INestApplication): void => {
  const configService = app.get(ConfigService);

  const origins = configService.get('origins');
  const methods = configService.get('methods');

  app.enableCors({
    origin: origins.split(','),
    methods,
  });
};

const initializeApp = async (app: INestApplication): Promise<void> => {
  const configService = app.get(ConfigService);

  const port = configService.get('port');

  app.use(helmet());
  app.setGlobalPrefix('api/v1');
  app.useGlobalPipes(createValidationPipe());

  setupCors(app);
  setupSwagger(app);

  await app.listen(port, '0.0.0.0');

  console.log(`Application is running on: ${await app.getUrl()}`);
};

const setupSwagger = (app: INestApplication): void => {
  const config = new DocumentBuilder()
    .setTitle('Fans-crm Data')
    .setDescription('Fans-crm Data API Description')
    .addBearerAuth()
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('/api/v1/swagger', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
    },
    customSiteTitle: 'Fans-crm Data API Description',
  });
};

bootstrap();
