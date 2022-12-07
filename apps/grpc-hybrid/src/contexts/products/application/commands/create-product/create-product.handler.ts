import { BadRequestException } from '@nestjs/common';
import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { Category } from '../../../domain-models/category';
import { Product } from '../../../domain-models/product';
import { ProductId } from '../../../domain-models/product-id';
import { CategoryRepository } from '../../../infrastructure/category.repository';
import { ProductRepository } from '../../../infrastructure/product.repository';
import { ProductCreatedLogEvent } from '../../events/product-created-log/product-created-log.event';
import { CreateProductCommand } from './create-product.command';
import { CreateProductResponse } from './create-product.response';

@CommandHandler(CreateProductCommand)
export class CreateProductHandler
  implements ICommandHandler<CreateProductCommand>
{
  constructor(
    private readonly repository: ProductRepository,
    private readonly categoryRepository: CategoryRepository,
    private readonly eventBus: EventBus,
  ) {}

  async execute({
    createProduct,
  }: CreateProductCommand): Promise<CreateProductResponse> {
    await this.productExists(createProduct.slug);
    const categories = await this.categoriesExists(createProduct.categories);

    const product = new Product({
      ...createProduct,
      id: new ProductId(),
      categories,
    });
    await this.repository.saveProduct(product);

    const event = new ProductCreatedLogEvent(product);
    this.eventBus.publish(event);

    return new CreateProductResponse(product);
  }

  async productExists(slug: string): Promise<void> {
    const product = await this.repository.findProduct({ slug });
    if (product) {
      throw new BadRequestException('product already exists.');
    }
  }

  async categoriesExists(ids: string[]): Promise<Category[]> {
    const categories: Category[] = [];
    if (ids) {
      for (const id of ids) {
        const category = await this.categoryRepository.findCategory({ id });
        if (!category) {
          throw new BadRequestException(`Category ${id} not found`);
        }
        categories.push(category);
      }
    }
    return categories;
  }
}
