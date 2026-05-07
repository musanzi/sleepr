import { BadRequestException, ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { createHash, randomBytes } from 'crypto';
import { User } from '../users/entities/user.entity';
import { UsersService } from '../users/users.service';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { RegisterDto } from './dto/register.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { Response } from 'express';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService
  ) {}

  async register(dto: RegisterDto): Promise<User> {
    const existingUser = await this.usersService.findByEmail(dto.email);
    if (existingUser) {
      throw new ConflictException('User with this email already exists');
    }
    return await this.usersService.create(dto);
  }

  async login(user: User, res: Response) {
    const token = this.generateToken(user);
    const expiresIn = this.configService.get('JWT_SECRET_EXPIRES_IN');
    res.cookie('Authentication', token, {
      httpOnly: true,
      expires: expiresIn
    });
  }

  async forgotPassword(dto: ForgotPasswordDto): Promise<{ message: string; resetToken?: string }> {
    const user = await this.usersService.findOneWithPassword(dto.email);
    if (!user) {
      return { message: 'If the account exists, a password reset token has been generated' };
    }
    const resetToken = randomBytes(32).toString('hex');
    await this.usersService.updateWithPassword(user.id, {
      password: null,
      passwordResetToken: this.hashResetToken(resetToken),
      passwordResetExpiresAt: new Date(Date.now() + 10 * 60 * 1000)
    });
    return { message: 'Password reset token generated', resetToken };
  }

  async resetPassword(dto: ResetPasswordDto): Promise<{ message: string }> {
    const user = await this.usersService.findByPasswordResetToken(this.hashResetToken(dto.token));
    if (!user || !user.passwordResetExpiresAt || user.passwordResetExpiresAt.getTime() < Date.now()) {
      throw new BadRequestException('Reset token is invalid or has expired');
    }
    await this.usersService.updateWithPassword(user.id, {
      password: await bcrypt.hash(dto.newPassword, 10),
      passwordResetToken: null,
      passwordResetExpiresAt: null
    });
    return { message: 'Password has been reset successfully' };
  }

  async validateCredentials(email: string, password: string): Promise<User> {
    const user = await this.usersService.findOneWithPassword(email);
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException('Invalid email or password');
    }
    return user;
  }

  private async generateToken(user: User): Promise<string> {
    const payload = { sub: user.id, email: user.email };
    const accessToken = this.jwtService.signAsync(payload);
    return accessToken;
  }

  private hashResetToken(token: string): string {
    return createHash('sha256').update(token).digest('hex');
  }
}
