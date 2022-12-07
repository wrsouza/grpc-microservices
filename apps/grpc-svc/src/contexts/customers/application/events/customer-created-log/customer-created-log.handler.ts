import { Logger } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { CustomerCreatedLogEvent } from './customer-created-log.event';

@EventsHandler(CustomerCreatedLogEvent)
export class CustomerCreatedLogHandler
  implements IEventHandler<CustomerCreatedLogEvent>
{
  handle({ customer }: CustomerCreatedLogEvent) {
    Logger.log(`Customer ${customer.id.value} was created`);
  }
}
