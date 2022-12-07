import { Controller, Logger } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { GrpcMethod } from '@nestjs/microservices';
import { ApiTags } from '@nestjs/swagger';
import {
  CreateCustomerCommand,
  CreateCustomerRequest,
  CreateCustomerResponse,
} from '../contexts/customers/application/commands';
import {
  CustomerDetailsQuery,
  CustomerDetailsRequest,
  CustomerDetailsResponse,
} from '../contexts/customers/application/queries';

@ApiTags('Customers')
@Controller('customers')
export class CustomersController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @GrpcMethod('CustomerService')
  async createCustomer(
    createCustomerRequest: CreateCustomerRequest,
  ): Promise<CreateCustomerResponse> {
    Logger.log(
      `GRPC createCustomerRequest: ${JSON.stringify(createCustomerRequest)}`,
    );
    const command = new CreateCustomerCommand(createCustomerRequest);
    return this.commandBus.execute(command);
  }

  @GrpcMethod('CustomerService')
  async customerDetails({
    id,
  }: CustomerDetailsRequest): Promise<CustomerDetailsResponse> {
    const query = new CustomerDetailsQuery(id);
    return this.queryBus.execute(query);
  }
}
