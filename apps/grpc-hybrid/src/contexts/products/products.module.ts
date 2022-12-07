import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriesController } from '../../api/categories.controller';
import { GrpcCategoriesController } from '../../api/grpc-categories.controller';
import { GrpcProductsController } from '../../api/grpc-products.controller';
import { ProductsController } from '../../api/products.controller';
import { CategorySchema } from '@app/common/database/schemas/category.schema';
import { ProductSchema } from '@app/common/database/schemas/product.schema';
import { CommandHandlers } from './application/commands/handlers';
import { EventHandlers } from './application/events/handlers';
import { QueryHandlers } from './application/queries/handlers';
import { CategoryRepository } from './infrastructure/category.repository';
import { ProductRepository } from './infrastructure/product.repository';

@Module({
  imports: [
    CqrsModule,
    TypeOrmModule.forFeature([ProductSchema, CategorySchema]),
  ],
  controllers: [
    ProductsController,
    CategoriesController,
    GrpcProductsController,
    GrpcCategoriesController,
  ],
  providers: [
    ...CommandHandlers,
    ...EventHandlers,
    ...QueryHandlers,
    ProductRepository,
    CategoryRepository,
  ],
  exports: [ProductRepository],
})
export class ProductsModule {}
