import { IEvent } from '@nestjs/cqrs';
import { Product } from '../../../domain-models/product';

export class ProductCreatedLogEvent implements IEvent {
  constructor(readonly product: Product) {}
}
