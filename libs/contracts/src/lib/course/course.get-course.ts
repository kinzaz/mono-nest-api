import { ICourse } from '@my-workspace/interfaces';
import { IsNumber } from 'class-validator';

export namespace CourseGetCourse {
  export const topic = 'course.get-course.query';

  export class Request {
    @IsNumber()
    id: number;
  }
  export class Response {
    course: ICourse | null;
  }
}
