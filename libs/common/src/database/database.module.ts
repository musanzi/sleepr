import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '../config/config.module';
import { EntityClassOrSchema } from '@nestjs/typeorm/dist/interfaces/entity-class-or-schema.type';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get('DB_HOST'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_NAME'),
        username: configService.get('DB_USERNAME'),
        autoLoadEntities: true,
        synchronize: true
      })
    })
  ]
})
export class DatabaseModule {
  static forFeature(repositories: EntityClassOrSchema[]) {
    return TypeOrmModule.forFeature(repositories);
  }
}
