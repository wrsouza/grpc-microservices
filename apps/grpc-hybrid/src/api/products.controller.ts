import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiTags } from '@nestjs/swagger';
import {
  CreateProductCommand,
  CreateProductRequest,
  CreateProductResponse,
} from '../contexts/products/application/commands';
import {
  PaginateProductsQuery,
  PaginateProductsResponse,
  ProductDetailsQuery,
  ProductDetailsRequest,
  ProductDetailsResponse,
  PaginateProductsRequest,
} from '../contexts/products/application/queries';

@ApiTags('Products')
@Controller('products')
export class ProductsController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Get()
  async paginateProducts(
    @Query() paginateProductsRequest: PaginateProductsRequest,
  ): Promise<PaginateProductsResponse> {
    const query = new PaginateProductsQuery(paginateProductsRequest);
    return this.queryBus.execute(query);
  }

  @Post()
  async createProduct(
    @Body() createProductRequest: CreateProductRequest,
  ): Promise<CreateProductResponse> {
    const command = new CreateProductCommand(createProductRequest);
    return this.commandBus.execute(command);
  }

  @Get(':id')
  async productDetails(
    @Param() { id }: ProductDetailsRequest,
  ): Promise<ProductDetailsResponse> {
    const query = new ProductDetailsQuery(id);
    return this.queryBus.execute(query);
  }
}
