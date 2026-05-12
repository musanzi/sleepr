import { Controller, Get } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { PaymentIntentCreateResult } from './interfaces/payment-result.type';
import { CreateChargeDto } from '@app/common';

@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @MessagePattern('create_charge')
  createCharge(@Payload() data: CreateChargeDto): Promise<PaymentIntentCreateResult> {
    return this.paymentsService.createCharge(data);
  }
}
