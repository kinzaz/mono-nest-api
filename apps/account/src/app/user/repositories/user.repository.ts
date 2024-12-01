import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { UserEntity } from '../entiites/user.entity';

@Injectable()
export class UserRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async createUser(user: UserEntity) {
    return this.prismaService.userModel.create({
      data: user,
    });
  }

  async findUser(email: string) {
    return this.prismaService.userModel.findFirst({
      where: { email },
    });
  }

  async deleteUser(email: string) {
    return this.prismaService.userModel.delete({
      where: { email },
    });
  }
}
