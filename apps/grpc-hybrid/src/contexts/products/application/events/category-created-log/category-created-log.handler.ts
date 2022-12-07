import { Logger } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { CategoryCreatedLogEvent } from './category-created-log.event';

@EventsHandler(CategoryCreatedLogEvent)
export class CategoryCreatedLogHandler
  implements IEventHandler<CategoryCreatedLogEvent>
{
  handle({ category }: CategoryCreatedLogEvent) {
    Logger.log(`Category ${category.id.value} was created`);
  }
}
