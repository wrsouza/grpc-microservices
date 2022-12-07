import { ApiProperty } from '@nestjs/swagger';

export class CreateCategoryResponse {
  @ApiProperty()
  id: string;
}
