import { ApiProperty } from '@nestjs/swagger';
import { Customer } from '../../../domain-models/customer';

export class CreateCustomerResponse {
  @ApiProperty()
  id: string;

  constructor(customer: Customer) {
    this.id = customer.id.value;
  }
}
