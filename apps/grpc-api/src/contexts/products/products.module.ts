import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';
import { grpcHybridClient } from '@app/common/transports';
import { ProductsController } from './products.controller';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'PRODUCTS_PACKAGE',
        ...grpcHybridClient,
      },
    ]),
  ],
  controllers: [ProductsController],
})
export class ProductsModule {}
