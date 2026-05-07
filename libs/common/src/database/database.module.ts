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
      useFactory: (configService: ConfigService) => {
        const isDocker = configService.get<string>('DOCKERIZED') === 'true';
        const host = configService.get<string>('DB_HOST') || (isDocker ? 'sleepr-db' : '127.0.0.1');
        const port = Number(configService.get<string>('DB_PORT') || 3306);

        return {
          type: 'mysql',
          host,
          port,
          password: configService.get('DB_PASSWORD'),
          database: configService.get('DB_NAME'),
          username: configService.get('DB_USERNAME'),
          autoLoadEntities: true,
          synchronize: true
        };
      }
    })
  ]
})
export class DatabaseModule {
  static forFeature(repositories: EntityClassOrSchema[]) {
    return TypeOrmModule.forFeature(repositories);
  }
}
