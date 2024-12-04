import { AccountChangeProfile } from '@my-workspace/contracts';
import { UserRole } from '@my-workspace/interfaces';
import { Body, Controller } from '@nestjs/common';
import { RMQRoute, RMQValidate } from 'nestjs-rmq';
import { UserEntity } from './entiites/user.entity';
import { UserRepository } from './repositories/user.repository';

@Controller('user')
export class UserCommands {
  constructor(private readonly userRepository: UserRepository) {}

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
}
