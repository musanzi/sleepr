import { NestFactory } from '@nestjs/core';
import { ReservationsModule } from './reservations/reservations.module';
import { ValidationPipe } from '@nestjs/common';
import { Logger } from 'nestjs-pino';

async function bootstrap() {
  const app = await NestFactory.create(ReservationsModule);
  app.useGlobalPipes(new ValidationPipe());
  app.useLogger(app.get(Logger));
  await app.listen(process.env.RESERVATIONS_PORT ?? 3000);
}
bootstrap().catch(() => {});
