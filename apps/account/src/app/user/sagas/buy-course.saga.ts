import { PurchaseState } from '@my-workspace/interfaces';
import { RMQService } from 'nestjs-rmq';
import { UserCoursesEntity } from '../entiites/userCourse.entity';
import { BuyCourseSagaState } from './buy-course.state';
import {
  BuyCourseSagaStateCanceled,
  BuyCourseSagaStateFinished,
  BuyCourseSagaStateProcess,
  BuyCourseSagaStateStarted,
} from './buy-course.steps';

export class BuyCourseSaga {
  private state: BuyCourseSagaState;

  constructor(
    public userCourse: UserCoursesEntity,
    public rmqService: RMQService
  ) {}

  getState() {
    return this.state;
  }

  setState(state: PurchaseState) {
    switch (state) {
      case PurchaseState.Started:
        this.state = new BuyCourseSagaStateStarted();
        break;
      case PurchaseState.WaitingForPayment:
        this.state = new BuyCourseSagaStateProcess();
        break;
      case PurchaseState.Purchased:
        this.state = new BuyCourseSagaStateFinished();
        break;
      case PurchaseState.Canceled:
        this.state = new BuyCourseSagaStateCanceled();
        break;
    }
    this.state.setContext(this);
    this.userCourse.setPurchaseState(state);
  }
}
