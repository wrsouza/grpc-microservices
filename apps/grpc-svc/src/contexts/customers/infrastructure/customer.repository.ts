import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Repository } from 'typeorm';
import {
  CustomerSchema,
  ICustomer,
} from '@app/common/database/schemas/customer.schema';
import { Customer } from '../domain-models/customer';
import { CustomerMapper } from '../domain-models/customer.mapper';

export class CustomerRepository {
  private readonly mapper: CustomerMapper;

  constructor(
    @InjectRepository(CustomerSchema)
    private repository: Repository<ICustomer>,
  ) {
    this.mapper = new CustomerMapper();
  }

  async saveCustomer(customer: Customer): Promise<void> {
    const record = this.mapper.toPersistence(customer);
    await this.repository.save(record);
  }

  async findCustomer(where: FindOptionsWhere<ICustomer>): Promise<Customer> {
    const record = await this.repository.findOneBy(where);
    if (!record) {
      return null;
    }
    return this.mapper.toDomain(record);
  }
}
