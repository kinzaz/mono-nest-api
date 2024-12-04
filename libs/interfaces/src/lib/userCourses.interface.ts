export enum PurchaseState {
  Started = 'Started',
  WaitingForPayment = 'WaitingForPayment',
  Purchased = 'Purchased',
  Canceled = 'Canceled',
}

export interface IUserCourses {
  courseId: number;
  purchaseState: PurchaseState;
}
