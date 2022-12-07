import { ApiProperty } from '@nestjs/swagger';

export class ProductDetailsResponse {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  sku: string;

  @ApiProperty()
  slug: string;

  @ApiProperty()
  price: number;

  @ApiProperty()
  stock: number;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  categories: string[];
}
