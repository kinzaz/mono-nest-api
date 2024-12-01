import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UserRepository } from './repositories/user.repository';
import { UserService } from './user.service';

@Module({
  providers: [UserService, PrismaService, UserRepository],
  exports: [UserRepository],
})
export class UserModule {}
