import { ApiProperty } from '@nestjs/swagger';
import { Category } from '../../../domain-models/category';

export class CategoryDetailsResponse {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  slug: string;

  @ApiProperty()
  createdAt: string;

  constructor(category: Category) {
    this.id = category.id.value;
    this.name = category.name;
    this.slug = category.slug;
    this.createdAt = category.createdAt.toISOString();
  }
}
