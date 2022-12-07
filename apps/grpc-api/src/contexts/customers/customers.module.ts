import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';
import { grpcSvcClient } from '@app/common/transports';
import { CustomersController } from './customers.controller';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'CUSTOMERS_PACKAGE',
        ...grpcSvcClient,
      },
    ]),
  ],
  controllers: [CustomersController],
})
export class CustomersModule {}
