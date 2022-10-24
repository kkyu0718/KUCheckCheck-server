import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as config from 'config';
import { TransformationInterceptor } from './global/TransformationInterceptor';
import { GlobalExceptionFilter } from './auth/filter/global-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const serverConfig = config.get('server');
  const port = serverConfig.port;

  app.useGlobalFilters(new GlobalExceptionFilter());
  app.enableCors();
  app.useGlobalInterceptors(new TransformationInterceptor());
  await app.listen(port);
}
bootstrap();
