import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';
import { grpcHybridClient } from '@app/common/transports';
import { CategoriesController } from './categories.controller';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'CATEGORIES_PACKAGE',
        ...grpcHybridClient,
      },
    ]),
  ],
  controllers: [CategoriesController],
})
export class CategoriesModule {}
