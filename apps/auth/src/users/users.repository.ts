import { AbstractRepository } from '@app/common';
import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UsersRepository extends AbstractRepository<User> {
  protected readonly logger!: Logger;

  constructor(
    @InjectRepository(User)
    userEntity: Repository<User>
  ) {
    super(userEntity);
  }
}
