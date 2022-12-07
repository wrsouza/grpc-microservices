import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';

export class ProductDetailsRequest {
  @ApiProperty()
  @IsUUID()
  id: string;
}
