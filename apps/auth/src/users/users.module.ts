import { Module } from '@nestjs/common';
import { DatabaseModule, JwtModule, LoggerModule } from '@app/common';
import { UsersController } from './users.controller';
import { User } from './entities/user.entity';
import { UsersRepository } from './users.repository';
import { UsersService } from './users.service';

@Module({
  imports: [DatabaseModule, JwtModule, LoggerModule, DatabaseModule.forFeature([User])],
  controllers: [UsersController],
  providers: [UsersService, UsersRepository],
  exports: [UsersService]
})
export class UsersModule {}
