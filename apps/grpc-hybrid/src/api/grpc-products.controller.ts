import { Controller } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { GrpcMethod } from '@nestjs/microservices';
import {
  CreateProductCommand,
  CreateProductRequest,
  CreateProductResponse,
} from '../contexts/products/application/commands';
import {
  PaginateProductsQuery,
  PaginateProductsRequest,
  PaginateProductsResponse,
  ProductDetailsQuery,
  ProductDetailsRequest,
  ProductDetailsResponse,
} from '../contexts/products/application/queries';

@Controller()
export class GrpcProductsController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @GrpcMethod('ProductService')
  async paginateProducts(
    paginateProductsRequest: PaginateProductsRequest,
  ): Promise<PaginateProductsResponse> {
    const query = new PaginateProductsQuery(paginateProductsRequest);
    return this.queryBus.execute(query);
  }

  @GrpcMethod('ProductService')
  async createProduct(
    createProductRequest: CreateProductRequest,
  ): Promise<CreateProductResponse> {
    const command = new CreateProductCommand(createProductRequest);
    return this.commandBus.execute(command);
  }

  @GrpcMethod('ProductService')
  async productDetails(
    productDetailsRequest: ProductDetailsRequest,
  ): Promise<ProductDetailsResponse> {
    const query = new ProductDetailsQuery(productDetailsRequest.id);
    return this.queryBus.execute(query);
  }
}
