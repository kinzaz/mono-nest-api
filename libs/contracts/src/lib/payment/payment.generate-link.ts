import { IsNumber } from 'class-validator';

export namespace PaymentGenerateLink {
  export const topic = 'payment.generate-link.command';

  export class Request {
    @IsNumber()
    sum: number;

    @IsNumber()
    courseId: number;

    @IsNumber()
    userId: number;
  }

  export class Response {
    link: string;
  }
}
