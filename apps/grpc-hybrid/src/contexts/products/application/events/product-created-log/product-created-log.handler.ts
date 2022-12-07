import { Logger } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { ProductCreatedLogEvent } from './product-created-log.event';

@EventsHandler(ProductCreatedLogEvent)
export class ProductCreatedLogHandler
  implements IEventHandler<ProductCreatedLogEvent>
{
  handle({ product }: ProductCreatedLogEvent) {
    Logger.log(`Product ${product.id.value} was created`);
  }
}
