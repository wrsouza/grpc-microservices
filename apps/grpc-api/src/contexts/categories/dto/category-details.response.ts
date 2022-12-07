import { ApiProperty } from '@nestjs/swagger';

export class CategoryDetailsResponse {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  slug: string;

  @ApiProperty()
  createdAt: Date;
}
