import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';

export class UpdateCustomerParams {
  @ApiProperty()
  @IsUUID()
  id: string;
}
