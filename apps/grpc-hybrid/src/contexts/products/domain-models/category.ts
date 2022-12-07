import { Entity } from '@app/common/domain-models';
import { CategoryId } from './category-id';

export interface ICategoryValues {
  id?: CategoryId;
  name: string;
  slug: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export class Category extends Entity<CategoryId> {
  private _name: string;
  private _slug: string;

  constructor(category: ICategoryValues) {
    super();
    this._id = category.id;
    this._name = category.name;
    this._slug = category.slug;
    this._createdAt = category.createdAt;
    this._updatedAt = category.updatedAt;
  }

  get name(): string {
    return this._name;
  }

  get slug(): string {
    return this._slug;
  }
}
