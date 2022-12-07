import { Controller } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { GrpcMethod } from '@nestjs/microservices';
import {
  CreateCategoryCommand,
  CreateCategoryRequest,
  CreateCategoryResponse,
} from '../contexts/products/application/commands';
import {
  CategoryDetailsQuery,
  CategoryDetailsRequest,
  CategoryDetailsResponse,
} from '../contexts/products/application/queries';

@Controller()
export class GrpcCategoriesController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @GrpcMethod('CategoryService')
  async createCategory(
    createCategoryRequest: CreateCategoryRequest,
  ): Promise<CreateCategoryResponse> {
    console.log('create category');
    const command = new CreateCategoryCommand(createCategoryRequest);
    return this.commandBus.execute(command);
  }

  @GrpcMethod('CategoryService')
  async categoryDetails(
    categoryDetailsRequest: CategoryDetailsRequest,
  ): Promise<CategoryDetailsResponse> {
    const query = new CategoryDetailsQuery(categoryDetailsRequest.id);
    return this.queryBus.execute(query);
  }
}
