import { EntitySchema, EntitySchemaRelationOptions } from 'typeorm';
import { ICategory } from './category.schema';

export interface IProduct {
  id?: string;
  name: string;
  sku: string;
  slug: string;
  price: number;
  stock: number;
  createdAt?: Date;
  updatedAt?: Date;
  categories?: ICategory[];
}

export const ProductSchema = new EntitySchema<IProduct>({
  name: 'products',
  columns: {
    id: {
      type: 'uuid',
      primary: true,
      generated: 'uuid',
    },
    name: {
      type: 'varchar',
      length: 200,
    },
    sku: {
      type: 'varchar',
      length: 40,
      unique: true,
    },
    slug: {
      type: 'varchar',
      length: 255,
    },
    price: {
      type: 'decimal',
      default: 0,
    },
    stock: {
      type: 'int',
    },
    createdAt: {
      name: 'created_at',
      type: 'timestamptz',
      createDate: true,
    },
    updatedAt: {
      name: 'updated_at',
      type: 'timestamptz',
      updateDate: true,
    },
  },
  relations: {
    categories: {
      target: 'categories',
      type: 'many-to-many',
      cascade: ['insert', 'update'],
      inverseSide: 'products',
      eager: true,
    } as EntitySchemaRelationOptions,
  },
});
