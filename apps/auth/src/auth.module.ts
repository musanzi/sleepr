import { JwtModule, LoggerModule } from '@app/common';
import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { LocalAuthStragtey } from './strategies/local.strategy';
import { JwtAuthStrategy } from './strategies/jwt.strategy';
import { UsersModule } from './users/users.module';

@Module({
  imports: [LoggerModule, JwtModule, UsersModule],
  controllers: [AuthController],
  providers: [AuthService, LocalAuthStragtey, JwtAuthStrategy]
})
export class AuthModule {}
