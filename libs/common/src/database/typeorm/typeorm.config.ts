import { ConfigService } from '@nestjs/config';
import {
  TypeOrmModuleAsyncOptions,
  TypeOrmModuleOptions,
} from '@nestjs/typeorm';
import {
  AddressSchema,
  CustomerSchema,
  ProductSchema,
  CategorySchema,
} from '../schemas';

export const typeOrmAsyncConfig: TypeOrmModuleAsyncOptions = {
  useFactory: (configService: ConfigService) =>
    ({
      type: 'postgres',
      url: configService.get<string>('CONNECTION_STRING'),
      entities: [CustomerSchema, AddressSchema, CategorySchema, ProductSchema],
      synchronize: false,
      logging: true,
      keepConnectionAlive: true,
    } as TypeOrmModuleOptions),
  inject: [ConfigService],
};
