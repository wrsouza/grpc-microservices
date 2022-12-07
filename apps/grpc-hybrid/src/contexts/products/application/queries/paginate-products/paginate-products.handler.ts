import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  IProduct,
  ProductSchema,
} from '@app/common/database/schemas/product.schema';
import { PaginateProductsQuery } from './paginate-products.query';
import { PaginateProductsResponse } from './paginate-products.response';

@QueryHandler(PaginateProductsQuery)
export class PaginateProductsHandler
  implements IQueryHandler<PaginateProductsQuery>
{
  constructor(
    @InjectRepository(ProductSchema)
    private repository: Repository<IProduct>,
  ) {}

  async execute({
    paginateProductsRequest,
  }: PaginateProductsQuery): Promise<PaginateProductsResponse> {
    const { page, perPage, sort } = paginateProductsRequest;

    const take = perPage || 15;
    const skip = ((page || 1) - 1) * take;

    let order = sort ? sort : 'id';
    if (order.charAt(0) === '-') {
      order = order.substring(1);
    }

    let direction = 'ASC';
    if (sort && sort.charAt(0) === '-') {
      direction = 'DESC';
    }

    const [result, total] = await this.repository.findAndCount({
      take,
      skip,
      order: {
        [order]: direction,
      },
    });

    return new PaginateProductsResponse({
      data: result,
      sort,
      page: page || 1,
      perPage: perPage || 15,
      total,
    });
  }
}
