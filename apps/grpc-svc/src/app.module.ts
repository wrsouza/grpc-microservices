import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { CustomersModule } from './contexts/customers/customers.module';
import { DatabaseModule } from '@app/common/database/database.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        CONNECTION_TYPE: Joi.string().required(),
        CONNECTION_STRING: Joi.string().required(),
      }),
      envFilePath: './apps/grpc-svc/.env',
    }),
    DatabaseModule,
    CustomersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
