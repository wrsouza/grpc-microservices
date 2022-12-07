import { ApiProperty } from '@nestjs/swagger';

export class CreateProductResponse {
  @ApiProperty()
  id: string;
}
