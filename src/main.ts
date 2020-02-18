import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import * as helmet from 'helmet';
import { config } from './config';
import { LoadMiddleware } from './common/middlewares/load.middleware';
import * as useragent from 'express-useragent';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(helmet());
  app.useGlobalPipes(new ValidationPipe());
  app.use(useragent.express());
  app.use(new LoadMiddleware().use);
  app.enableCors();
  await app.listen(config.get('port'));

  Logger.log('Server started! Port: ' + config.get('port'));
}
bootstrap();
