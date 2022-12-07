import { IEvent } from '@nestjs/cqrs';
import { Customer } from '../../../domain-models/customer';

export class CustomerUpdatedLogEvent implements IEvent {
  constructor(readonly customer: Customer) {}
}
