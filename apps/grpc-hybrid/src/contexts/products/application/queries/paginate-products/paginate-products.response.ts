import { ApiProperty } from '@nestjs/swagger';
import { IProduct } from '@app/common/database/schemas/product.schema';

interface PaginateResult {
  data: IProduct[];
  page: number;
  perPage: number;
  sort: string;
  total: number;
}

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

  constructor(result: PaginateResult) {
    this.data = result.data.map((item) => ({
      id: item.id,
      name: item.name,
      sku: item.sku,
      price: item.price,
    }));
    this.page = result.page;
    this.perPage = result.perPage;
    this.sort = result.sort;
    this.total = result.total;
  }
}
