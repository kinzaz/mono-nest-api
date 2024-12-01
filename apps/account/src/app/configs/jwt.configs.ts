import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModuleAsyncOptions } from '@nestjs/jwt';

export const getJwtConfig = (): JwtModuleAsyncOptions => ({
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: (configService) => ({
    secret: configService.get('JWT_SECRET'),
  }),
});
