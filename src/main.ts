import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as config from 'config';
import { TransformationInterceptor } from './global/TransformationInterceptor';
import { GlobalExceptionFilter } from './global/global-exception.filter';
<<<<<<< HEAD
=======
import { ValidationPipe } from '@nestjs/common';
>>>>>>> origin

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const serverConfig = config.get('server');
  const port = serverConfig.port;
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );
  app.useGlobalFilters(new GlobalExceptionFilter());
  app.useGlobalInterceptors(new TransformationInterceptor());
  app.enableCors();
  await app.listen(port);
}
bootstrap();
