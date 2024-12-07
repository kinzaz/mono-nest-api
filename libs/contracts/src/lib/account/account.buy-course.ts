import { IsNumber } from 'class-validator';

export namespace AccountBuyCourse {
  export const topic = 'account.buy-course.command';

  export class Request {
    @IsNumber()
    userId: number;

    @IsNumber()
    courseId: number;
  }

  export class Response {
    paymentLink: string;
  }
}
