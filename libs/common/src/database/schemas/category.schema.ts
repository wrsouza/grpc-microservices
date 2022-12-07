import { EntitySchema, EntitySchemaRelationOptions } from 'typeorm';
import { IProduct } from './product.schema';

export interface ICategory {
  id?: string;
  name: string;
  slug: string;
  createdAt?: Date;
  updatedAt?: Date;
  products?: IProduct[];
}

export const CategorySchema = new EntitySchema<ICategory>({
  name: 'categories',
  columns: {
    id: {
      type: 'uuid',
      primary: true,
      generated: 'uuid',
    },
    name: {
      type: 'varchar',
      length: 100,
    },
    slug: {
      type: 'varchar',
      length: 150,
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
    products: {
      target: 'products',
      type: 'many-to-many',
      cascade: ['insert', 'update'],
      joinTable: {
        name: 'category_product',
        joinColumn: {
          name: 'product_id',
          referencedColumnName: 'id',
        },
        inverseJoinColumn: {
          name: 'category_id',
          referencedColumnName: 'id',
        },
      },
      inverseSide: 'categories',
    } as EntitySchemaRelationOptions,
  },
});
