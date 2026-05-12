import { BadRequestException, ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import bcrypt from 'bcryptjs';
import { createHash, randomBytes } from 'crypto';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { RegisterDto } from './dto/register.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { Response } from 'express';
import { ConfigService } from '@nestjs/config';
import { TokenPaylod } from './interfaces/auth.interfaces';
import { User } from './users/entities/user.entity';
import { UsersService } from './users/users.service';

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
    const token = await this.generateToken(user);
    const expiresIn = Number(this.configService.getOrThrow('COOKIE_EXPIRES_IN'));
    const expires = new Date();
    expires.setSeconds(expires.getSeconds() + expiresIn);
    res.cookie('Authentication', token, { httpOnly: true, expires });
    res.send(user);
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
    return await this.usersService.findOne(user.id);
  }

  private async generateToken(user: User): Promise<string> {
    const payload: TokenPaylod = { sub: user.id, email: user.email };
    return this.jwtService.signAsync(payload);
  }

  private hashResetToken(token: string): string {
    return createHash('sha256').update(token).digest('hex');
  }
}
