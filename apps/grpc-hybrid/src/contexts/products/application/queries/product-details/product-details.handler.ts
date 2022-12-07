import { NotFoundException } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  IProduct,
  ProductSchema,
} from '@app/common/database/schemas/product.schema';
import { ProductMapper } from '../../../domain-models/product.mapper';
import { ProductDetailsQuery } from './product-details.query';
import { ProductDetailsResponse } from './product-details.response';

@QueryHandler(ProductDetailsQuery)
export class ProductDetailsHandler
  implements IQueryHandler<ProductDetailsQuery>
{
  private readonly mapper: ProductMapper;

  constructor(
    @InjectRepository(ProductSchema)
    private repository: Repository<IProduct>,
  ) {
    this.mapper = new ProductMapper();
  }

  async execute({ id }: ProductDetailsQuery): Promise<ProductDetailsResponse> {
    const record = await this.repository.findOneBy({ id });
    if (!record) {
      throw new NotFoundException('product not found');
    }
    const product = this.mapper.toDomain(record);
    return new ProductDetailsResponse(product);
  }
}
