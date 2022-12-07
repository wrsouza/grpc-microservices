import { IQuery } from '@nestjs/cqrs';

export class CategoryDetailsQuery implements IQuery {
  constructor(readonly id: string) {}
}
