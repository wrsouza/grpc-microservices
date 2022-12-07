export interface IMapper<DomainEntity, DbRecord> {
  toPersistence(entity: DomainEntity): DbRecord;
  toDomain(record: DbRecord): DomainEntity;
}
