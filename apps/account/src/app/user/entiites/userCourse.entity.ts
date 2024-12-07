import { IUserCourses, PurchaseState } from '@my-workspace/interfaces';

export class UserCoursesEntity implements IUserCourses {
  courseId: number;
  purchaseState: PurchaseState;
  userId: number;

  constructor(userCourses: IUserCourses) {
    this.courseId = userCourses.courseId;
    this.purchaseState = userCourses.purchaseState;
    this.userId = userCourses.userId;
  }

  public setPurchaseState(state: PurchaseState) {
    this.purchaseState = state;
    return this;
  }
}
