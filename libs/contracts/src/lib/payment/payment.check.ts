import { IsNumber } from 'class-validator';

export type PaymentStatus = 'canceled' | 'success' | 'progress';

export namespace PaymentCheck {
  export const topic = 'payment.check.query';

  export class Request {
    @IsNumber()
    courseId: number;

    @IsNumber()
    userId: number;
  }

  export class Response {
    status: PaymentStatus;
  }
}
