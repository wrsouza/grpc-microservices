import { IMapper } from '@app/common/domain-models';
import { ICustomer } from '@app/common/database/schemas/customer.schema';
import { Address } from './address';
import { Customer } from './customer';
import { CustomerId } from './customer-id';

export class CustomerMapper implements IMapper<Customer, ICustomer> {
  toPersistence(entity: Customer): ICustomer {
    return {
      id: entity.id.value,
      name: entity.name,
      documentNumber: entity.documentNumber,
      address: {
        postalCode: entity.address.postalCode,
        lineAddress: entity.address.lineAddress,
        city: entity.address.city,
        state: entity.address.state,
      },
    };
  }

  toDomain(record: ICustomer): Customer {
    const id = new CustomerId(record.id);
    return new Customer({
      id,
      name: record.name,
      documentNumber: record.documentNumber,
      createdAt: record.createdAt,
      updatedAt: record.updatedAt,
      address: new Address({
        postalCode: record.address.postalCode,
        lineAddress: record.address.lineAddress,
        city: record.address.city,
        state: record.address.state,
      }),
    });
  }
}
