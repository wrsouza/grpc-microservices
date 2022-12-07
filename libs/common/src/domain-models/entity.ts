import { Identity } from './identity';

export interface IEntity<EntityId extends Identity> {
  get id(): EntityId;
  get createdAt(): Date;
  get updatedAt(): Date;
}

export abstract class Entity<EntityId extends Identity>
  implements IEntity<EntityId>
{
  protected _id: EntityId;
  protected _createdAt: Date;
  protected _updatedAt: Date;

  public get id(): EntityId {
    return this._id;
  }

  public get createdAt(): Date {
    return this._createdAt;
  }

  public get updatedAt(): Date {
    return this._updatedAt;
  }
}
