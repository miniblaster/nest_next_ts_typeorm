import { Injectable } from '@nestjs/common';
import {
  TypeOrmOptionsFactory,
  TypeOrmModuleOptions,
} from '@nestjs/typeorm';
import { EnvService } from '../env/env.service';

@Injectable()
export class TypeOrmService implements TypeOrmOptionsFactory {
  constructor(
    private readonly env: EnvService,
  ) {}

  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'postgres',
      host: this.env.get('DB_HOST'),
      port: parseInt(this.env.get('DB_PORT'), 10),
      username: this.env.get('DB_USERNAME'),
      password: this.env.get('DB_PASSWORD'),
      database: this.env.get('DB_DATABASE'),
      synchronize: this.env.get('DB_SYNCHRONIZE') === 'true',
      entities: [__dirname + '/../../entities/*.entity{.ts,.js}'],
    };
  }
}
