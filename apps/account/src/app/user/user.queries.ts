import { AccountUserCourses, AccountUserInfo } from '@my-workspace/contracts';
import { UserRole } from '@my-workspace/interfaces';
import { Body, Controller } from '@nestjs/common';
import { RMQRoute, RMQValidate } from 'nestjs-rmq';
import { UserEntity } from './entiites/user.entity';
import { UserRepository } from './repositories/user.repository';
import { UserCoursesRepository } from './repositories/userCourses.repository';

@Controller('user')
export class UserQueries {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly userCoursesRepository: UserCoursesRepository
  ) {}
  @RMQValidate()
  @RMQRoute(AccountUserInfo.topic)
  async userInfo(
    @Body() { id }: AccountUserInfo.Request
  ): Promise<AccountUserInfo.Response> {
    const user = await this.userRepository.findUserById(Number(id));
    const profile = new UserEntity({
      ...user,
      role: user.role as UserRole,
    });
    return {
      profile,
    };
  }

  @RMQValidate()
  @RMQRoute(AccountUserCourses.topic)
  async userCourses(@Body() id: string) {
    return this.userCoursesRepository.findCoursesByUserId(Number(id));
  }
}
