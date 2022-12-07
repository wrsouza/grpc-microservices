import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Repository } from 'typeorm';
import {
  CategorySchema,
  ICategory,
} from '@app/common/database/schemas/category.schema';
import { Category } from '../domain-models/category';
import { CategoryMapper } from '../domain-models/category.mapper';

export class CategoryRepository {
  private readonly mapper: CategoryMapper;

  constructor(
    @InjectRepository(CategorySchema)
    private repository: Repository<ICategory>,
  ) {
    this.mapper = new CategoryMapper();
  }

  async saveCategory(product: Category): Promise<void> {
    const record = this.mapper.toPersistence(product);
    await this.repository.save(record);
  }

  async findCategory(where: FindOptionsWhere<ICategory>): Promise<Category> {
    const record = await this.repository.findOneBy(where);
    if (!record) {
      return null;
    }
    return this.mapper.toDomain(record);
  }
}
