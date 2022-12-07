import { v4 as uuid } from 'uuid';

export interface IIdentity {
  get value(): string;
}

export abstract class Identity implements IIdentity {
  private _value: string;

  constructor(value?: string) {
    this._value = value ? value : uuid();
  }

  get value(): string {
    return this._value;
  }
}
