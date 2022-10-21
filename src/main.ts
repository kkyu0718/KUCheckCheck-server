import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as config from 'config';
import { GlobalExceptionFilter } from './auth/filter/global-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const serverConfig = config.get('server');
  const port = serverConfig.port;

  app.useGlobalFilters(new GlobalExceptionFilter());
  app.enableCors();
  await app.listen(port);
}
bootstrap();
