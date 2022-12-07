import { ICommand } from '@nestjs/cqrs';
import { CreateCategoryRequest } from './create-category.request';

export class CreateCategoryCommand implements ICommand {
  constructor(readonly createCategory: CreateCategoryRequest) {}
}
