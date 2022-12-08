import { Controller, UseFilters } from '@nestjs/common';
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
import { HttpExceptionFilter } from '@app/common/exceptions/http-exception.filter';

@Controller()
export class GrpcCategoriesController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @GrpcMethod('CategoryService')
  @UseFilters(new HttpExceptionFilter())
  async createCategory(
    createCategoryRequest: CreateCategoryRequest,
  ): Promise<CreateCategoryResponse> {
    console.log('create category');
    const command = new CreateCategoryCommand(createCategoryRequest);
    return this.commandBus.execute(command);
  }

  @GrpcMethod('CategoryService')
  @UseFilters(new HttpExceptionFilter())
  async categoryDetails(
    categoryDetailsRequest: CategoryDetailsRequest,
  ): Promise<CategoryDetailsResponse> {
    const query = new CategoryDetailsQuery(categoryDetailsRequest.id);
    return this.queryBus.execute(query);
  }
}
