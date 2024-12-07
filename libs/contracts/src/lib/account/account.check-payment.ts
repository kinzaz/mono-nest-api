import { IsNumber } from 'class-validator';
import { PaymentStatus } from '../payment/payment.check';

export namespace AccountCheckPayment {
  export const topic = 'account.check-payment.command';

  export class Request {
    @IsNumber()
    userId: number;

    @IsNumber()
    courseId: number;
  }

  export class Response {
    status: PaymentStatus;
  }
}
