import { ICommand } from '@nestjs/cqrs';
import { CreateCustomerRequest } from './create-customer.request';

export class CreateCustomerCommand implements ICommand {
  constructor(readonly createCustomer: CreateCustomerRequest) {}
}
