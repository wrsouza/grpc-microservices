import { IQuery } from '@nestjs/cqrs';

export class ProductDetailsQuery implements IQuery {
  constructor(readonly id: string) {}
}
