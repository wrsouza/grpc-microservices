import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { DatabaseModule } from '@app/common/database/database.module';
import { ProductsModule } from './contexts/products/products.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        PORT: Joi.number().required(),
        CONNECTION_TYPE: Joi.string().required(),
        CONNECTION_STRING: Joi.string().required(),
      }),
      envFilePath: './apps/grpc-hybrid/.env',
    }),
    DatabaseModule,
    ProductsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
