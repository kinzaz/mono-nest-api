import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    UserModule,
    AuthModule,
    PrismaModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: 'envs/.account.env',
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
