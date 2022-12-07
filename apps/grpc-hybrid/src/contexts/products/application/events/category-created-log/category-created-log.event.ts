import { IEvent } from '@nestjs/cqrs';
import { Category } from '../../../domain-models/category';

export class CategoryCreatedLogEvent implements IEvent {
  constructor(readonly category: Category) {}
}
