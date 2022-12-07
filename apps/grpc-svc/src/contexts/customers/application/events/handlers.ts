import { CustomerCreatedLogHandler } from './customer-created-log/customer-created-log.handler';
import { CustomerUpdatedLogHandler } from './customer-udpated-log/customer-updated-log.handler';

export const EventHandlers = [
  CustomerCreatedLogHandler,
  CustomerUpdatedLogHandler,
];
