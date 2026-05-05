import { Module } from '@nestjs/common';
import { ConfigModule as NestJSConfig } from '@nestjs/config';

@Module({
  imports: [NestJSConfig.forRoot()],
  exports: [NestJSConfig]
})
export class ConfigModule {}
