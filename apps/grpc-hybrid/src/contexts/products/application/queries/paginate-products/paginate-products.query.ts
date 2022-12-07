import { IQuery } from '@nestjs/cqrs';
import { PaginateProductsRequest } from './paginate-products.request';

export class PaginateProductsQuery implements IQuery {
  constructor(readonly paginateProductsRequest: PaginateProductsRequest) {}
}
