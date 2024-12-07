import { PaymentStatus } from '@my-workspace/contracts';
import { UserCoursesEntity } from '../entiites/userCourse.entity';
import { BuyCourseSaga } from './buy-course.saga';

export abstract class BuyCourseSagaState {
  public saga: BuyCourseSaga;

  public setContext(saga: BuyCourseSaga) {
    this.saga = saga;
  }

  public abstract pay(): Promise<{
    paymentLink: string;
    userCourse: UserCoursesEntity;
  }>;
  public abstract checkPayment(): Promise<{
    userCourse: UserCoursesEntity;
    status: PaymentStatus;
  }>;
  public abstract cancel(): Promise<{ userCourse: UserCoursesEntity }>;
}
