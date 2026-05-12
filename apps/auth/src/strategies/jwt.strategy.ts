import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { UsersService } from '../users/users.service';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { TokenPaylod } from '../interfaces/auth.interfaces';

@Injectable()
export class JwtAuthStrategy extends PassportStrategy(Strategy) {
  constructor(
    configService: ConfigService,
    private readonly usersService: UsersService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req: unknown) => req?.['cookies']?.['Authentication'] || req?.['Authentication']
      ]),
      secretOrKey: configService.getOrThrow('JWT_ACCESS_SECRET')
    });
  }

  async validate({ sub }: TokenPaylod) {
    return this.usersService.findOne(sub);
  }
}
