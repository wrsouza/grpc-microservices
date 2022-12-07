import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { CategoriesModule } from './contexts/categories/categories.module';
import { CustomersModule } from './contexts/customers/customers.module';
import { ProductsModule } from './contexts/products/products.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        PORT: Joi.number().required(),
      }),
      envFilePath: './apps/grpc-api/.env',
    }),
    CustomersModule,
    ProductsModule,
    CategoriesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
