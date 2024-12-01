import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { getJwtConfig } from '../configs/jwt.configs';
import { PrismaService } from '../prisma/prisma.service';
import { UserRepository } from '../user/repositories/user.repository';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [JwtModule.registerAsync(getJwtConfig())],
  controllers: [AuthController],
  providers: [AuthService, UserRepository, PrismaService],
})
export class AuthModule {}
