import { ApiProperty } from '@nestjs/swagger';
import { Customer } from '../../../domain-models/customer';

class AddressDetailsReponse {
  @ApiProperty()
  postalCode: string;

  @ApiProperty()
  lineAddress: string;

  @ApiProperty()
  city: string;

  @ApiProperty()
  state: string;
}

export class CustomerDetailsResponse {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  documentNumber: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty({
    type: AddressDetailsReponse,
  })
  address: AddressDetailsReponse;

  constructor(customer: Customer) {
    this.id = customer.id.value;
    this.name = customer.name;
    this.documentNumber = customer.documentNumber;
    this.createdAt = customer.createdAt;

    const { address } = customer;
    this.address = {
      postalCode: address.postalCode,
      lineAddress: address.lineAddress,
      city: address.city,
      state: address.state,
    };
  }
}
