import { IUserCourses } from '@my-workspace/interfaces';
import { IsString } from 'class-validator';

export namespace AccountUserCourses {
  export const topic = 'account.user-info.query';

  export class Request {
    @IsString()
    id: string;
  }

  export class Response {
    courses: IUserCourses[];
  }
}
