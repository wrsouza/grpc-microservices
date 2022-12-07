import { ICommand } from '@nestjs/cqrs';
import { CreateProductRequest } from './create-product.request';

export class CreateProductCommand implements ICommand {
  constructor(readonly createProduct: CreateProductRequest) {}
}
