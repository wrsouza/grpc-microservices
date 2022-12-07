import { NotFoundException } from '@nestjs/common';
import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { CustomerRepository } from '../../../infrastructure/customer.repository';
import { Customer } from '../../../domain-models/customer';
import { UpdateCustomerCommand } from './update-customer.command';
import { UpdateCustomerResponse } from './update-customer.response';
import { CustomerUpdatedLogEvent } from '../../events';

@CommandHandler(UpdateCustomerCommand)
export class UpdateCustomerHandler
  implements ICommandHandler<UpdateCustomerCommand>
{
  constructor(
    private readonly repository: CustomerRepository,
    private readonly eventBus: EventBus,
  ) {}

  async execute({
    id,
    updateCustomer,
  }: UpdateCustomerCommand): Promise<UpdateCustomerResponse> {
    const customer = await this.customerExists(id);
    customer.update(updateCustomer);
    await this.repository.saveCustomer(customer);

    const event = new CustomerUpdatedLogEvent(customer);
    this.eventBus.publish(event);

    return new UpdateCustomerResponse(customer);
  }

  async customerExists(id: string): Promise<Customer> {
    const customer = await this.repository.findCustomer({ id });
    if (!customer) {
      throw new NotFoundException('customer not exists');
    }
    return customer;
  }
}
