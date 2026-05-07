import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { UsersRepository } from './users.repository';
import { ExcludedFields } from './interfaces/user.interfaces';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async create(dto: CreateUserDto): Promise<User> {
    const existingUser = await this.usersRepository.findByEmail(dto.email);
    if (existingUser) {
      throw new ConflictException('User with this email already exists');
    }
    return this.usersRepository.create({
      ...dto,
      password: await bcrypt.hash(dto.password, 10)
    });
  }

  findAll(): Promise<User[]> {
    return this.usersRepository.findAll();
  }

  findOne(id: string): Promise<User> {
    return this.usersRepository.findOne(id);
  }

  findByEmail(email: string): Promise<User | null> {
    return this.usersRepository.findByEmail(email);
  }

  findById(id: string): Promise<User | null> {
    return this.usersRepository.findById(id);
  }

  findByPasswordResetToken(passwordResetToken: string): Promise<User | null> {
    return this.usersRepository.findByPasswordResetToken(passwordResetToken);
  }

  async update(id: string, dto: UpdateUserDto): Promise<User> {
    return this.usersRepository.update(id, dto);
  }

  async getProfile(id: string) {
    return await this.findOne(id);
  }

  async updateProfile(id: string, dto: UpdateUserDto) {
    return await this.update(id, dto);
  }

  async updateWithPassword(email: string, dto: ExcludedFields): Promise<User> {
    const user = await this.usersRepository.findOneWithPassword(email);
    if (!user) {
      throw new NotFoundException('No user found with this email');
    }
    Object.assign(user, dto);
    return this.usersRepository.saveUser(user);
  }

  async findOneWithPassword(email: string): Promise<User | null> {
    return this.usersRepository.findOneWithPassword(email);
  }

  remove(id: string): Promise<void> {
    return this.usersRepository.delete(id);
  }
}
