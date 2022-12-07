import { Aggregate } from '@app/common/domain-models';
import { IProduct } from '@app/common/database/schemas/product.schema';
import { Category } from './category';
import { ProductId } from './product-id';

export interface IProductValues {
  id?: ProductId;
  name: string;
  sku: string;
  slug: string;
  price: number;
  stock: number;
  createdAt?: Date;
  updatedAt?: Date;
  categories?: Category[];
}

export class Product extends Aggregate<ProductId> {
  private _name: string;
  private _sku: string;
  private _slug: string;
  private _price: number;
  private _stock: number;
  private _categories: Category[] = [];

  constructor(product: IProductValues) {
    super();
    this._id = product.id;
    this._name = product.name;
    this._sku = product.sku;
    this._slug = product.slug;
    this._price = product.price;
    this._stock = product.stock;
    this._createdAt = product.createdAt;
    this._updatedAt = product.updatedAt;
    this._categories = product.categories;
  }

  get name(): string {
    return this._name;
  }

  get sku(): string {
    return this._sku;
  }

  get slug(): string {
    return this._slug;
  }

  get price(): number {
    return this._price;
  }

  get stock(): number {
    return this._stock;
  }

  get categories(): Category[] {
    return this._categories;
  }

  update(product: Partial<IProduct>) {
    if (product.name) {
      this._name = product.name;
    }
    if (product.sku) {
      this._sku = product.sku;
    }
    if (product.slug) {
      this._slug = product.slug;
    }
    if (product.price) {
      this._price = product.price;
    }
    if (product.stock) {
      this._stock = product.stock;
    }
  }
}
