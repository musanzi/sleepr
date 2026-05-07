import { User } from '../../users/entities/user.entity';

export interface AuthResponse {
  token: string;
  user: User;
}

export interface JwtRequestUser {
  sub: string;
  email: string;
}
