import { NotFoundException } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  CategorySchema,
  ICategory,
} from '@app/common/database/schemas/category.schema';
import { CategoryMapper } from '../../../domain-models/category.mapper';
import { CategoryDetailsQuery } from './category-details.query';
import { CategoryDetailsResponse } from './category-details.response';

@QueryHandler(CategoryDetailsQuery)
export class CategoryDetailsHandler
  implements IQueryHandler<CategoryDetailsQuery>
{
  private readonly mapper: CategoryMapper;

  constructor(
    @InjectRepository(CategorySchema)
    private repository: Repository<ICategory>,
  ) {
    this.mapper = new CategoryMapper();
  }

  async execute({
    id,
  }: CategoryDetailsQuery): Promise<CategoryDetailsResponse> {
    const record = await this.repository.findOneBy({ id });
    if (!record) {
      throw new NotFoundException('product not found');
    }
    const category = this.mapper.toDomain(record);
    return new CategoryDetailsResponse(category);
  }
}
