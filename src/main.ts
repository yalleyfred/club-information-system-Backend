import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { json, urlencoded } from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    })
  );

  app.use(json({ limit: '50mb' }));
  app.use(urlencoded({ extended: true, limit: '50mb', parameterLimit: 999 }));
  app.enableCors({
    origin: 'http://localhost:4200',
    credentials: true,
    methods: 'GET, OPTIONS, POST, PUT, PATCH',
    allowedHeaders: 'Cache-Control, Pragma, Origin, Authorization, Content-Type, X-Requested-With',
  });

  app.useGlobalPipes(new ValidationPipe());
  await app.listen(1000);
}
bootstrap();
