import { ApiProperty } from '@nestjs/swagger';

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
}
