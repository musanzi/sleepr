import Stripe from 'stripe';

export type PaymentIntentCreateResult = Awaited<ReturnType<Stripe.Stripe['paymentIntents']['create']>>;
