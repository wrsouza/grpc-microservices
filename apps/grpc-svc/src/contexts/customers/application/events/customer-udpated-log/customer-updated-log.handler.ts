import { Logger } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { CustomerUpdatedLogEvent } from './customer-updated-log.event';

@EventsHandler(CustomerUpdatedLogEvent)
export class CustomerUpdatedLogHandler
  implements IEventHandler<CustomerUpdatedLogEvent>
{
  handle({ customer }: CustomerUpdatedLogEvent) {
    Logger.log(`Customer ${customer.id.value} was updated`);
  }
}
