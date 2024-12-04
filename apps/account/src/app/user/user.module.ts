import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UserRepository } from './repositories/user.repository';
import { UserCoursesRepository } from './repositories/userCourses.repository';
import { UserCommands } from './user.commands';
import { UserQueries } from './user.queries';
import { UserService } from './user.service';

@Module({
  controllers: [UserCommands, UserQueries],
  providers: [UserService, PrismaService, UserRepository],
  exports: [UserRepository, UserCoursesRepository],
})
export class UserModule {}
