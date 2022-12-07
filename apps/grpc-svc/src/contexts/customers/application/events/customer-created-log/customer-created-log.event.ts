import { IEvent } from '@nestjs/cqrs';
import { Customer } from '../../../domain-models/customer';

export class CustomerCreatedLogEvent implements IEvent {
  constructor(readonly customer: Customer) {}
}
