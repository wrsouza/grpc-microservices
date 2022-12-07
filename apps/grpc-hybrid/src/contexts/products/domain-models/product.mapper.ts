import { IMapper } from '@app/common/domain-models';
import { IProduct } from '@app/common/database/schemas/product.schema';
import { Category } from './category';
import { CategoryId } from './category-id';
import { Product } from './product';
import { ProductId } from './product-id';

export class ProductMapper implements IMapper<Product, IProduct> {
  toPersistence(entity: Product): IProduct {
    return {
      id: entity.id.value,
      name: entity.name,
      sku: entity.sku,
      slug: entity.slug,
      price: entity.price,
      stock: entity.stock,
      categories: entity.categories.map((category) => ({
        id: category.id.value,
        name: category.name,
        slug: category.slug,
      })),
    };
  }

  toDomain(record: IProduct): Product {
    const id = new ProductId(record.id);
    return new Product({
      id,
      name: record.name,
      sku: record.sku,
      slug: record.slug,
      price: record.price,
      stock: record.stock,
      createdAt: record.createdAt,
      updatedAt: record.updatedAt,
      categories: record.categories.map(
        (category) =>
          new Category({
            id: new CategoryId(category.id),
            name: category.name,
            slug: category.slug,
            createdAt: category.createdAt,
            updatedAt: category.updatedAt,
          }),
      ),
    });
  }
}
