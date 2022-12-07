import { Aggregate } from '@app/common/domain-models';
import { ICustomer } from '@app/common/database/schemas/customer.schema';
import { Address } from './address';
import { CustomerId } from './customer-id';

export interface ICustomerValues {
  id?: CustomerId;
  name: string;
  documentNumber: string;
  createdAt?: Date;
  updatedAt?: Date;
  address: Address;
}

export class Customer extends Aggregate<CustomerId> {
  private _name: string;
  private _documentNumber: string;
  private _address: Address;

  constructor(customer: ICustomerValues) {
    super();
    this._id = customer.id;
    this._name = customer.name;
    this._documentNumber = customer.documentNumber;
    this._createdAt = customer.createdAt;
    this._updatedAt = customer.updatedAt;
    this._address = customer.address;
  }

  get name(): string {
    return this._name;
  }

  get documentNumber(): string {
    return this._documentNumber;
  }

  get address(): Address {
    return this._address;
  }

  update(customer: Partial<ICustomer>) {
    if (customer.name) {
      this._name = customer.name;
    }
    if (customer.documentNumber) {
      this._documentNumber = customer.documentNumber;
    }
    if (customer.address) {
      this._address.update(customer.address);
    }
  }
}
