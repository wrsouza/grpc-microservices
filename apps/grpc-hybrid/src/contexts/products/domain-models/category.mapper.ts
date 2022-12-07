import { IMapper } from '@app/common/domain-models';
import { ICategory } from '@app/common/database/schemas/category.schema';
import { Category } from './category';
import { CategoryId } from './category-id';

export class CategoryMapper implements IMapper<Category, ICategory> {
  toPersistence(entity: Category): ICategory {
    return {
      id: entity.id.value,
      name: entity.name,
      slug: entity.slug,
    };
  }

  toDomain(record: ICategory): Category {
    const id = new CategoryId(record.id);
    return new Category({
      id,
      name: record.name,
      slug: record.slug,
      createdAt: record.createdAt,
      updatedAt: record.updatedAt,
    });
  }
}
