import { Module } from '@nestjs/common';
import { ConfigService, ConfigModule as NestJSConfig } from '@nestjs/config';

@Module({
  imports: [NestJSConfig.forRoot()],
  exports: [ConfigService],
})
export class ConfigModule {}
