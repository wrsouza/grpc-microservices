import { BadRequestException } from '@nestjs/common';
import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { Category } from '../../../domain-models/category';
import { ProductId } from '../../../domain-models/product-id';
import { CategoryRepository } from '../../../infrastructure/category.repository';
import { CategoryCreatedLogEvent } from '../../events/category-created-log/category-created-log.event';
import { CreateCategoryCommand } from './create-category.command';
import { CreateCategoryResponse } from './create-category.response';

@CommandHandler(CreateCategoryCommand)
export class CreateCategoryHandler
  implements ICommandHandler<CreateCategoryCommand>
{
  constructor(
    private readonly repository: CategoryRepository,
    private readonly eventBus: EventBus,
  ) {}

  async execute({
    createCategory,
  }: CreateCategoryCommand): Promise<CreateCategoryResponse> {
    await this.categoryExists(createCategory.slug);

    const category = new Category({
      ...createCategory,
      id: new ProductId(),
    });
    await this.repository.saveCategory(category);

    const event = new CategoryCreatedLogEvent(category);
    this.eventBus.publish(event);

    return new CreateCategoryResponse(category);
  }

  async categoryExists(slug: string): Promise<void> {
    const category = await this.repository.findCategory({ slug });
    if (category) {
      throw new BadRequestException('category already exists.');
    }
  }
}
