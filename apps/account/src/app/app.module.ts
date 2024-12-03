import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { RMQModule } from 'nestjs-rmq';
import { AuthModule } from './auth/auth.module';
import { getRMQConfig } from './configs/rmq.config';
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
    RMQModule.forRootAsync(getRMQConfig()),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
