import { ClientOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';

export const grpcHybridClient: ClientOptions = {
  transport: Transport.GRPC,
  options: {
    url: '0.0.0.0:5052',
    package: ['products', 'categories'],
    protoPath: [
      join(__dirname, '..', '..', 'libs', 'common', 'proto', 'products.proto'),
      join(
        __dirname,
        '..',
        '..',
        'libs',
        'common',
        'proto',
        'categories.proto',
      ),
    ],
  },
};
