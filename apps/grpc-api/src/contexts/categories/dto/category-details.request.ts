import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';

export class CategoryDetailsRequest {
  @ApiProperty()
  @IsUUID()
  id: string;
}
