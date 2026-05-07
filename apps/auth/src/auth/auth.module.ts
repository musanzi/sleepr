import { JwtModule, LoggerModule } from '@app/common';
import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { AccessTokenGuard } from './guards/access-token.guard';
import { LocalStragtey } from './strategies/local.strategy';

@Module({
  imports: [LoggerModule, JwtModule, UsersModule],
  controllers: [AuthController],
  providers: [AuthService, LocalStragtey, AccessTokenGuard]
})
export class AuthModule {}
