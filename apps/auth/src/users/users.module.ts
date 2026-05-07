import { Module } from '@nestjs/common';
import { DatabaseModule, JwtModule, LoggerModule } from '@app/common';
import { AccessTokenGuard } from '../auth/guards/access-token.guard';
import { UsersController } from './users.controller';
import { User } from './entities/user.entity';
import { UsersRepository } from './users.repository';
import { UsersService } from './users.service';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [DatabaseModule, JwtModule, LoggerModule, DatabaseModule.forFeature([User])],
  controllers: [UsersController],
  providers: [
    UsersService,
    UsersRepository,
    {
      provide: APP_GUARD,
      useClass: AccessTokenGuard
    }
  ],
  exports: [UsersService]
})
export class UsersModule {}
