import { JwtModule, LoggerModule } from '@app/common';
import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { LocalStragtey } from './strategies/local.strategy';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Module({
  imports: [LoggerModule, JwtModule, UsersModule],
  controllers: [AuthController],
  providers: [AuthService, LocalStragtey, LocalAuthGuard]
})
export class AuthModule {}
