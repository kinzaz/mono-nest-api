import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class UserCoursesRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async findCoursesByUserId(id: number) {
    return this.prismaService.userCourseModel.findMany({
      where: { userId: id },
    });
  }
}
