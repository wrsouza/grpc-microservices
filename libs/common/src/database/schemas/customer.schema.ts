import { EntitySchema } from 'typeorm';
import { IAddress } from './address.schema';

export interface ICustomer {
  id: string;
  name: string;
  documentNumber: string;
  createdAt?: Date;
  updatedAt?: Date;
  address: IAddress;
}

export const CustomerSchema = new EntitySchema<ICustomer>({
  name: 'customers',
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
    documentNumber: {
      name: 'document_number',
      type: 'varchar',
      length: 14,
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
    address: {
      target: 'address',
      type: 'one-to-one',
      cascade: ['insert', 'update'],
      eager: true,
      inverseSide: 'customer',
    },
  },
});
