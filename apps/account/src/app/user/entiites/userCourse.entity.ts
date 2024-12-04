import { IUserCourses, PurchaseState } from '@my-workspace/interfaces';
import { UserEntity } from './user.entity';

export class UserCoursesEntity implements IUserCourses {
  courseId: number;
  purchaseState: PurchaseState;
  user: UserEntity;

  constructor(userCourses: IUserCourses, user: UserEntity) {
    this.courseId = userCourses.courseId;
    this.purchaseState = userCourses.purchaseState;
    this.user = user;
  }

  public setPurchaseState(state: PurchaseState) {
    this.purchaseState = state;
    return this;
  }
}
