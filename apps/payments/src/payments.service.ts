import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Stripe from 'stripe';
import { PaymentIntentCreateResult } from './interfaces/payment-result.type';
import { CreateChargeDto } from '@app/common';

@Injectable()
export class PaymentsService {
  private readonly stripe: Stripe.Stripe;

  constructor(private readonly configService: ConfigService) {
    this.stripe = new Stripe(this.configService.getOrThrow<string>('STRIPE_SECRET_KEY'), {
      apiVersion: '2026-04-22.dahlia'
    });
  }

  async createCharge({ card, amount }: CreateChargeDto): Promise<PaymentIntentCreateResult> {
    const paymentMethod = await this.stripe.paymentMethods.create({ type: 'card', card });
    return await this.stripe.paymentIntents.create({
      payment_method: paymentMethod.id,
      amount: amount * 100,
      payment_method_types: ['card'],
      confirm: true,
      currency: 'usd'
    });
  }
}
