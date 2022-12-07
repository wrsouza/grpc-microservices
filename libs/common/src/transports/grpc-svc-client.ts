import { ClientOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';

export const grpcSvcClient: ClientOptions = {
  transport: Transport.GRPC,
  options: {
    url: '0.0.0.0:5051',
    package: ['customers'],
    protoPath: [
      join(__dirname, '..', '..', 'libs', 'common', 'proto', 'customers.proto'),
    ],
  },
};
