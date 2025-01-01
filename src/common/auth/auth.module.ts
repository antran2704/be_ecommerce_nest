import { Module } from '@nestjs/common';
import { AuthCommonService } from './services/auth.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  imports: [
    JwtModule.registerAsync({
      inject: [ConfigService],
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('auth.accessTokenSecret'),
        signOptions: {
          expiresIn: configService.get<string>('auth.accessTokenExpiresIn'),
        },
      }),
    }),
  ],
  providers: [AuthCommonService, JwtStrategy],
  exports: [AuthCommonService],
})
export class AuthCommonModule {}
