import { ApiProperty } from '@nestjs/swagger';
import { Category } from '../../../domain-models/category';

export class CreateCategoryResponse {
  @ApiProperty()
  id: string;

  constructor(category: Category) {
    this.id = category.id.value;
  }
}
