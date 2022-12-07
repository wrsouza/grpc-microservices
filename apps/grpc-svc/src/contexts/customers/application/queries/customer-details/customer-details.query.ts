import { IQuery } from '@nestjs/cqrs';

export class CustomerDetailsQuery implements IQuery {
  constructor(readonly id: string) {}
}
