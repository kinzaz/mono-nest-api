import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { UserCoursesEntity } from '../entiites/userCourse.entity';

@Injectable()
export class UserCoursesRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async findCoursesByUserId(id: number) {
    return this.prismaService.userCourseModel.findMany({
      where: { userId: id },
    });
  }

  async findCourseByUserId(userId: number, courseId: number) {
    return this.prismaService.userCourseModel.findFirst({
      where: { courseId, userId },
    });
  }

  async createUserCourse(userCourse: UserCoursesEntity) {
    return this.prismaService.userCourseModel.create({
      data: userCourse,
    });
  }

  async updateCourse(userCourse: UserCoursesEntity) {
    return this.prismaService.userCourseModel.updateMany({
      data: userCourse,
      where: { userId: userCourse.userId, courseId: userCourse.courseId },
    });
  }
}
