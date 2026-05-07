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

  saveUser(user: User): Promise<User> {
    return this.entityRepository.save(user);
  }

  findByEmail(email: string): Promise<User | null> {
    return this.entityRepository.findOneBy({ email });
  }

  findById(id: string): Promise<User | null> {
    return this.entityRepository.findOneBy({ id });
  }

  findByPasswordResetToken(passwordResetToken: string): Promise<User | null> {
    return this.entityRepository.findOne({
      where: { passwordResetToken },
      select: ['email', 'password', 'passwordResetToken', 'passwordResetExpiresAt']
    });
  }

  async findOneWithPassword(email: string): Promise<User | null> {
    return await this.entityRepository.findOne({
      where: { email },
      select: ['email', 'password', 'passwordResetToken', 'passwordResetExpiresAt']
    });
  }
}
