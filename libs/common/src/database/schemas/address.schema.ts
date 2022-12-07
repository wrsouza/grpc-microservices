import { EntitySchema } from 'typeorm';
import { ICustomer } from './customer.schema';

export interface IAddress {
  customerId?: string;
  postalCode: string;
  lineAddress: string;
  city: string;
  state: string;
  customer?: ICustomer;
}

export const AddressSchema = new EntitySchema<IAddress>({
  name: 'address',
  columns: {
    customerId: {
      name: 'customer_id',
      type: 'uuid',
      primary: true,
    },
    postalCode: {
      type: 'varchar',
      length: 8,
    },
    lineAddress: {
      type: 'varchar',
      length: 255,
    },
    city: {
      type: 'varchar',
      length: 100,
    },
    state: {
      type: 'varchar',
      length: 2,
    },
  },
  relations: {
    customer: {
      target: 'customers',
      type: 'one-to-one',
      joinColumn: {
        name: 'customer_id',
        referencedColumnName: 'id',
      },
      onDelete: 'CASCADE',
      inverseSide: 'address',
    },
  },
});
