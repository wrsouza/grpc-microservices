import { ICommand } from '@nestjs/cqrs';
import { UpdateCustomerRequest } from './update-customer.request';

export class UpdateCustomerCommand implements ICommand {
  constructor(
    readonly id: string,
    readonly updateCustomer: UpdateCustomerRequest,
  ) {}
}
