import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions } from '@nestjs/microservices';
import { SwaggerModule } from '@nestjs/swagger';
import { grpcHybridClient } from '@app/common/transports';
import { AppModule } from './app.module';
import { swaggerConfig } from './data/swagger/swagger.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
    }),
  );
  const configService = app.get(ConfigService);

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('swagger', app, document);

  app.connectMicroservice<MicroserviceOptions>(grpcHybridClient);
  await app.startAllMicroservices();

  await app.listen(configService.get<number>('PORT'));
}
bootstrap();
