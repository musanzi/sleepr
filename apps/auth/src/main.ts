import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import cookieParser from 'cookie-parser';
import { AuthModule } from './auth.module';
import { Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(AuthModule);
  app.connectMicroservice({
    transport: Transport.TCP,
    options: {
      host: '0.0.0.0',
      port: process.env.TCP_PORT
    }
  });
  app.use(cookieParser());
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true
    })
  );
  app.startAllMicroservices();
  await app.listen(process.env.AUTH_PORT ?? 3000);
}

bootstrap().catch((error) => {
  console.error(error);
  process.exit(1);
});
