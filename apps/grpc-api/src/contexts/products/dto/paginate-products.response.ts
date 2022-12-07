import { ApiProperty } from '@nestjs/swagger';

class ProductList {
  id: string;
  name: string;
  sku: string;
  price: number;
}

export class PaginateProductsResponse {
  @ApiProperty()
  data: ProductList[];

  @ApiProperty()
  page: number;

  @ApiProperty()
  perPage: number;

  @ApiProperty()
  sort: string;

  @ApiProperty()
  total: number;
}
