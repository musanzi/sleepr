import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '../config/config.module';
import { EntityClassOrSchema } from '@nestjs/typeorm/dist/interfaces/entity-class-or-schema.type';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        url: configService.get('DB_UI'),
        autoLoadEntities: true,
      }),
    }),
  ],
})
export class DatabaseModule {
  static forFeature(repositories: EntityClassOrSchema[]) {
    return TypeOrmModule.forFeature(repositories);
  }
}
