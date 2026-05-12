import { NestFactory } from '@nestjs/core';
import { PaymentsModule } from './payments.module';
import { Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(PaymentsModule);
  app.connectMicroservice({
    transport: Transport.TCP,
    options: {
      host: '0.0.0.0',
      port: process.env.PAYEMENTS_TCP_PORT
    }
  });
  await app.startAllMicroservices();
  await app.listen(process.env.PAYMENTS_PORT ?? 3000);
}

bootstrap().catch((error) => {
  console.error(error);
  process.exit(1);
});
