import { ApiProperty } from '@nestjs/swagger';
import { Product } from '../../../domain-models/product';

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
  createdAt: string;

  @ApiProperty()
  categories: string[];

  constructor(product: Product) {
    this.id = product.id.value;
    this.name = product.name;
    this.sku = product.sku;
    this.slug = product.slug;
    this.price = product.price;
    this.stock = product.stock;
    this.createdAt = product.createdAt.toISOString();
    this.categories = product.categories.map((category) => category.id.value);
  }
}
