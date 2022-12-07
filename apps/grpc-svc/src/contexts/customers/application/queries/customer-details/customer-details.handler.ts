import { NotFoundException } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  CustomerSchema,
  ICustomer,
} from '@app/common/database/schemas/customer.schema';
import { CustomerMapper } from '../../../domain-models/customer.mapper';
import { CustomerDetailsQuery } from './customer-details.query';
import { CustomerDetailsResponse } from './customer-details.response';

@QueryHandler(CustomerDetailsQuery)
export class CustomerDetailsHandler
  implements IQueryHandler<CustomerDetailsQuery>
{
  private readonly mapper: CustomerMapper;

  constructor(
    @InjectRepository(CustomerSchema)
    private repository: Repository<ICustomer>,
  ) {
    this.mapper = new CustomerMapper();
  }

  async execute({
    id,
  }: CustomerDetailsQuery): Promise<CustomerDetailsResponse> {
    const record = await this.repository.findOneBy({ id });
    if (!record) {
      throw new NotFoundException('customer not found');
    }
    const customer = this.mapper.toDomain(record);
    return new CustomerDetailsResponse(customer);
  }
}
