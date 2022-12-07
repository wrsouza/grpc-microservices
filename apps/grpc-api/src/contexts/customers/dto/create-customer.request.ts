import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { IsString, ValidateNested } from 'class-validator';

class CreateCustomerAddressRequest {
  @ApiProperty({
    minLength: 8,
    maxLength: 8,
    example: '19050-920',
  })
  @IsString()
  @Transform(({ value }) => value.replace(/\D/g, ''))
  postalCode: string;

  @ApiProperty({
    maxLength: 255,
    example: 'Rua José Bongiovani, 700',
  })
  @IsString()
  lineAddress: string;

  @ApiProperty({
    maxLength: 50,
    example: 'Presidente Prudente',
  })
  @IsString()
  city: string;

  @ApiProperty({
    minLength: 2,
    maxLength: 2,
    example: 'SP',
  })
  @IsString()
  state: string;
}

export class CreateCustomerRequest {
  @ApiProperty({
    maxLength: 100,
    example: 'John Doe',
  })
  @IsString()
  name: string;

  @ApiProperty({
    minLength: 11,
    maxLength: 14,
    example: '812.876.578-77',
  })
  @IsString()
  @Transform(({ value }) => value.replace(/\D/g, ''))
  documentNumber: string;

  @ApiProperty({
    type: CreateCustomerAddressRequest,
  })
  @ValidateNested()
  @Type(() => CreateCustomerAddressRequest)
  address: CreateCustomerAddressRequest;
}
