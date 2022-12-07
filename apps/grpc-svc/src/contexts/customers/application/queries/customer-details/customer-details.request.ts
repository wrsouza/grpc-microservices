import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';

export class CustomerDetailsRequest {
  @ApiProperty()
  @IsUUID()
  id: string;
}
