import { ApiProperty } from '@nestjs/swagger';
import { Product } from '../../../domain-models/product';

export class CreateProductResponse {
  @ApiProperty()
  id: string;

  constructor(product: Product) {
    this.id = product.id.value;
  }
}
