export interface IUser {
  displayName?: string;
  email: string;
  password: string;
  role: UserRole;
}

export enum UserRole {
  Teacher = 'Teacher',
  Student = 'Student',
}
