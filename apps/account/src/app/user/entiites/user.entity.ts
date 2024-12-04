import { IUser, UserRole } from '@my-workspace/interfaces';
import { compare, genSalt, hash } from 'bcryptjs';

export class UserEntity implements IUser {
  displayName?: string;
  email: string;
  password: string;
  role: UserRole;

  constructor(user: IUser) {
    this.displayName = user.displayName;
    this.email = user.email;
    this.role = user.role;
    this.password = user.password;
  }

  public async setPassword(password: string) {
    const salt = await genSalt(10);
    this.password = await hash(password, salt);
    return this;
  }

  public validatePassword(password: string) {
    return compare(password, this.password);
  }

  public updateProfile(displayName: string) {
    this.displayName = displayName;
    return this;
  }

  public getPublicProfile() {
    return {
      email: this.email,
      role: this.role,
      displayName: this.displayName,
    };
  }
}
