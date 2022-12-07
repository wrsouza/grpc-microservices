import { AggregateRoot } from '@nestjs/cqrs';
import { IEntity } from './entity';
import { Identity } from './identity';

export abstract class Aggregate<EntityId extends Identity>
  extends AggregateRoot
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
