import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { IsOptional, IsString, ValidateNested } from 'class-validator';

class UpdateAddressRequest {
  @ApiProperty({
    minLength: 8,
    maxLength: 8,
    example: '19050-920',
    required: false,
  })
  @IsOptional()
  @IsString()
  @Transform(({ value }) => value.replace(/\D/g, ''))
  postalCode: string;

  @ApiProperty({
    maxLength: 255,
    example: 'Rua José Bongiovani, 700',
    required: false,
  })
  @IsOptional()
  @IsString()
  lineAddress: string;

  @ApiProperty({
    maxLength: 50,
    example: 'Presidente Prudente',
    required: false,
  })
  @IsOptional()
  @IsString()
  city: string;

  @ApiProperty({
    minLength: 2,
    maxLength: 2,
    example: 'SP',
    required: false,
  })
  @IsOptional()
  @IsString()
  state: string;
}

export class UpdateCustomerRequest {
  @ApiProperty({
    maxLength: 100,
    example: 'John Doe',
    required: false,
  })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({
    type: UpdateAddressRequest,
  })
  @ValidateNested()
  @Type(() => UpdateAddressRequest)
  address: UpdateAddressRequest;
}
