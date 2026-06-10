import { HttpExceptionFilter } from '@filters/http-exception.filter';
import { HttpException, HttpStatus, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { ValidationError } from 'class-validator';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  function formatErrors(errors: ValidationError[]) {
    const result: Record<string, string> = {};
    for (const error of errors) {
      if (error.constraints) {
        result[error.property] = Object.values(error.constraints)[0];
      }
    }
    return result;
  }

  app.useGlobalFilters(new HttpExceptionFilter());

  app.enableCors({
    origin: configService.get<string>('FRONTEND_URL'),
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      exceptionFactory: (errors) => {
        return new HttpException(formatErrors(errors), HttpStatus.BAD_REQUEST);
      },
    }),
  );

  await app.listen(process.env.PORT ?? 5001);
}
bootstrap();
