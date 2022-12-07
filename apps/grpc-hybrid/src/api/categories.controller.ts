import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiTags } from '@nestjs/swagger';
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

@ApiTags('Categories')
@Controller('categories')
export class CategoriesController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post()
  async createCategory(
    @Body() createCategoryRequest: CreateCategoryRequest,
  ): Promise<CreateCategoryResponse> {
    const command = new CreateCategoryCommand(createCategoryRequest);
    return this.commandBus.execute(command);
  }

  @Get(':id')
  async categoryDetails(
    @Param() { id }: CategoryDetailsRequest,
  ): Promise<CategoryDetailsResponse> {
    const query = new CategoryDetailsQuery(id);
    return this.queryBus.execute(query);
  }
}
