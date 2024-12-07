import {
  AccountBuyCourse,
  AccountChangeProfile,
  AccountCheckPayment,
} from '@my-workspace/contracts';
import { PurchaseState, UserRole } from '@my-workspace/interfaces';
import { Body, Controller } from '@nestjs/common';
import { RMQRoute, RMQService, RMQValidate } from 'nestjs-rmq';
import { UserEntity } from './entiites/user.entity';
import { UserCoursesEntity } from './entiites/userCourse.entity';
import { UserRepository } from './repositories/user.repository';
import { UserCoursesRepository } from './repositories/userCourses.repository';
import { BuyCourseSaga } from './sagas/buy-course.saga';

@Controller('user')
export class UserCommands {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly userCoursesRepository: UserCoursesRepository,
    private readonly rmqService: RMQService
  ) {}

  @RMQValidate()
  @RMQRoute(AccountChangeProfile.topic)
  async changeProfile(@Body() { user, id }: AccountChangeProfile.Request) {
    const existedUser = await this.userRepository.findUserById(Number(id));
    if (!existedUser) {
      throw new Error('Такого пользователя не существует');
    }
    const userEntity = new UserEntity({
      ...existedUser,
      role: existedUser.role as UserRole,
    }).updateProfile(user.displayName);
    await this.userRepository.updateUser(userEntity, Number(id));
    return {};
  }

  @RMQValidate()
  @RMQRoute(AccountBuyCourse.topic)
  async buyCourse(
    @Body() { userId, courseId }: AccountBuyCourse.Request
  ): Promise<AccountBuyCourse.Response> {
    const userCourseEntity = new UserCoursesEntity({
      courseId,
      userId,
      purchaseState: PurchaseState.Started,
    });

    const saga = new BuyCourseSaga(userCourseEntity, this.rmqService);
    const { userCourse, paymentLink } = await saga.getState().pay();
    await this.userCoursesRepository.updateCourse(userCourse);

    return { paymentLink };
  }

  @RMQValidate()
  @RMQRoute(AccountCheckPayment.topic)
  async checkPayment(
    @Body() { userId, courseId }: AccountCheckPayment.Request
  ): Promise<AccountCheckPayment.Response> {
    const userCourseEntity = new UserCoursesEntity({
      courseId,
      userId,
      purchaseState: PurchaseState.Started,
    });
    const saga = new BuyCourseSaga(userCourseEntity, this.rmqService);

    const { userCourse, status } = await saga.getState().checkPayment();
    await this.userCoursesRepository.updateCourse(userCourse);
    return { status };
  }
}
