import {
  CourseGetCourse,
  PaymentCheck,
  PaymentGenerateLink,
  PaymentStatus,
} from '@my-workspace/contracts';
import { PurchaseState } from '@my-workspace/interfaces';
import { UserCoursesEntity } from '../entiites/userCourse.entity';
import { BuyCourseSagaState } from './buy-course.state';

export class BuyCourseSagaStateStarted extends BuyCourseSagaState {
  public async pay(): Promise<{
    paymentLink: string;
    userCourse: UserCoursesEntity;
  }> {
    const { course } = await this.saga.rmqService.send<
      CourseGetCourse.Request,
      CourseGetCourse.Response
    >(CourseGetCourse.topic, { id: this.saga.userCourse.courseId });

    if (!course) {
      throw new Error('Такого курса не существует');
    }

    if (course.price == 0) {
      this.saga.setState(PurchaseState.Purchased);
      return { paymentLink: null, userCourse: this.saga.userCourse };
    }

    const { link } = await this.saga.rmqService.send<
      PaymentGenerateLink.Request,
      PaymentGenerateLink.Response
    >(PaymentGenerateLink.topic, {
      courseId: course.id,
      sum: course.price,
      userId: this.saga.userCourse.userId,
    });
    this.saga.setState(PurchaseState.WaitingForPayment);

    return { paymentLink: link, userCourse: this.saga.userCourse };
  }
  public checkPayment(): Promise<{
    userCourse: UserCoursesEntity;
    status: PaymentStatus;
  }> {
    throw new Error('Нельзя проверить платеж, который не начался.');
  }
  public async cancel(): Promise<{ userCourse: UserCoursesEntity }> {
    this.saga.setState(PurchaseState.Canceled);
    return { userCourse: this.saga.userCourse };
  }
}

export class BuyCourseSagaStateProcess extends BuyCourseSagaState {
  public pay(): Promise<{
    paymentLink: string;
    userCourse: UserCoursesEntity;
  }> {
    throw new Error('Нельзя создать ссылку на оплату в процессе');
  }

  public async checkPayment(): Promise<{
    userCourse: UserCoursesEntity;
    status: PaymentStatus;
  }> {
    const { status } = await this.saga.rmqService.send<
      PaymentCheck.Request,
      PaymentCheck.Response
    >(PaymentCheck.topic, {
      courseId: this.saga.userCourse.courseId,
      userId: this.saga.userCourse.userId,
    });

    if (status === 'canceled') {
      this.saga.setState(PurchaseState.Canceled);
      return { userCourse: this.saga.userCourse, status };
    }

    if (status !== 'success') {
      return { userCourse: this.saga.userCourse, status };
    }

    this.saga.setState(PurchaseState.Purchased);
    return { userCourse: this.saga.userCourse, status };
  }

  public async cancel(): Promise<{ userCourse: UserCoursesEntity }> {
    throw new Error('Нельзя отменить оплату в процессе');
  }
}

export class BuyCourseSagaStateFinished extends BuyCourseSagaState {
  public pay(): Promise<{
    paymentLink: string;
    userCourse: UserCoursesEntity;
  }> {
    throw new Error('Нельзя оплатить купленный курс.');
  }
  public checkPayment(): Promise<{
    userCourse: UserCoursesEntity;
    status: PaymentStatus;
  }> {
    throw new Error('Нельзя проверить платеж по купленному курсу.');
  }
  public cancel(): Promise<{ userCourse: UserCoursesEntity }> {
    throw new Error('Нельзя отменить купленный курс.');
  }
}

export class BuyCourseSagaStateCanceled extends BuyCourseSagaState {
  public pay(): Promise<{
    paymentLink: string;
    userCourse: UserCoursesEntity;
  }> {
    this.saga.setState(PurchaseState.Started);
    return this.saga.getState().pay();
  }
  public checkPayment(): Promise<{
    userCourse: UserCoursesEntity;
    status: PaymentStatus;
  }> {
    throw new Error('Нельзя проверить платеж по отмененному курсу.');
  }
  public cancel(): Promise<{ userCourse: UserCoursesEntity }> {
    throw new Error('Нельзя отменить отмененный курс.');
  }
}
