import { Module } from '@nestjs/common';
import { AuthController } from './controllers/auth.controller';
import { AuthService } from './services/auth.service';
import { AuthCommonModule } from 'src/common/auth/auth.module';

@Module({
  imports: [AuthCommonModule],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
