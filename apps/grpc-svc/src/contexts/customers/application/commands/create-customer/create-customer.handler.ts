import { BadRequestException } from '@nestjs/common';
import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { CustomerRepository } from '../../../infrastructure/customer.repository';
import { Customer } from '../../../domain-models/customer';
import { CustomerCreatedLogEvent } from '../../events/customer-created-log/customer-created-log.event';
import { CreateCustomerCommand } from './create-customer.command';
import { CreateCustomerResponse } from './create-customer.response';
import { Address } from '../../../domain-models/address';
import { CustomerId } from '../../../domain-models/customer-id';

@CommandHandler(CreateCustomerCommand)
export class CreateCustomerHandler
  implements ICommandHandler<CreateCustomerCommand>
{
  constructor(
    private readonly repository: CustomerRepository,
    private readonly eventBus: EventBus,
  ) {}

  async execute({
    createCustomer,
  }: CreateCustomerCommand): Promise<CreateCustomerResponse> {
    const { documentNumber } = createCustomer;
    await this.customerExists(documentNumber);

    const customer = new Customer({
      ...createCustomer,
      id: new CustomerId(),
      address: new Address({
        ...createCustomer.address,
      }),
    });
    await this.repository.saveCustomer(customer);

    const event = new CustomerCreatedLogEvent(customer);
    this.eventBus.publish(event);

    return new CreateCustomerResponse(customer);
  }

  async customerExists(documentNumber: string): Promise<any> {
    const customer = await this.repository.findCustomer({ documentNumber });
    if (customer) {
      throw new BadRequestException('customer already exists.');
    }
  }
}
