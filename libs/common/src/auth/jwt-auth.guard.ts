import { CanActivate, ExecutionContext, Inject, Injectable } from '@nestjs/common';
import { Observable, of } from 'rxjs';
import { ClientProxy } from '@nestjs/microservices';
import { Request } from 'express';
import { catchError, map, tap } from 'rxjs/operators';
import { AUTH_SERVICE } from '../constants/service';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY } from './decorators';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(
    @Inject(AUTH_SERVICE) private readonly authClient: ClientProxy,
    private reflector: Reflector
  ) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const jwt = context.switchToHttp().getRequest().cookies?.Authentication;
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass()
    ]);
    if (isPublic) {
      return true;
    }
    if (!jwt && !isPublic) {
      return false;
    }
    return this.authClient.send('authenticate', { Authentication: jwt }).pipe(
      tap((res) => {
        console.log(res);
        context.switchToHttp().getRequest<Request>().user = res;
      }),
      map(() => true),
      catchError((err) => {
        console.log(err);
        return of(false);
      })
    );
  }
}
