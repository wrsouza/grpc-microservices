import { DocumentBuilder } from '@nestjs/swagger';

export const swaggerConfig = new DocumentBuilder()
  .setTitle('gRPC Project')
  .setDescription('gRPC Project Api')
  .setVersion('1.0')
  .addTag('Customers')
  .addTag('Categories')
  .addTag('Products')
  .build();
