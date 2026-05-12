import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { ReservationsModule } from './reservations.module';
import cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(ReservationsModule);
  app.use(cookieParser());
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true
    })
  );
  const port = process.env.RESERVATIONS_PORT ?? 3000;
  await app.listen(port);
}

bootstrap().catch((error) => {
  console.error(error);
  process.exit(1);
});
