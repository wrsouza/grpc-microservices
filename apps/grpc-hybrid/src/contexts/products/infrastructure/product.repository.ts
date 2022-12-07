import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Repository } from 'typeorm';
import {
  IProduct,
  ProductSchema,
} from '@app/common/database/schemas/product.schema';
import { Product } from '../domain-models/product';
import { ProductMapper } from '../domain-models/product.mapper';

export class ProductRepository {
  private readonly mapper: ProductMapper;

  constructor(
    @InjectRepository(ProductSchema)
    private repository: Repository<IProduct>,
  ) {
    this.mapper = new ProductMapper();
  }

  async saveProduct(product: Product): Promise<void> {
    const record = this.mapper.toPersistence(product);
    await this.repository.save(record);
  }

  async findProduct(where: FindOptionsWhere<IProduct>): Promise<Product> {
    const record = await this.repository.findOneBy(where);
    if (!record) {
      return null;
    }
    return this.mapper.toDomain(record);
  }
}
