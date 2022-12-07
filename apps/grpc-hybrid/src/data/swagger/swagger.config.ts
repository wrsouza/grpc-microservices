import { DocumentBuilder } from '@nestjs/swagger';

export const swaggerConfig = new DocumentBuilder()
  .setTitle('gRPC Hybrid Project')
  .setDescription('gRPC Hybrid Project Api')
  .setVersion('1.0')
  .addTag('Categories')
  .addTag('Products')
  .build();
