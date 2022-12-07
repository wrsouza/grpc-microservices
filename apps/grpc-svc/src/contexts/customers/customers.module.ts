import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomersController } from '../../api/customers.controller';
import { AddressSchema } from '@app/common/database/schemas/address.schema';
import { CustomerSchema } from '@app/common/database/schemas/customer.schema';
import { CommandHandlers } from './application/commands/handlers';
import { EventHandlers } from './application/events/handlers';
import { QueryHandlers } from './application/queries/handlers';
import { CustomerRepository } from './infrastructure/customer.repository';

@Module({
  imports: [
    CqrsModule,
    TypeOrmModule.forFeature([CustomerSchema, AddressSchema]),
  ],
  controllers: [CustomersController],
  providers: [
    ...CommandHandlers,
    ...EventHandlers,
    ...QueryHandlers,
    CustomerRepository,
  ],
  exports: [CustomerRepository],
})
export class CustomersModule {}
