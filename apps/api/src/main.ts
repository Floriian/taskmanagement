import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { EnoentExceptionFilter } from './filters/enoent.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );

  app.useGlobalFilters(new EnoentExceptionFilter());

  app.setGlobalPrefix('/api');
  await app.listen(3000);
}
bootstrap();
