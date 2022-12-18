import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import config from './config';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({ origin: '*' });

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );

  const swaggerConfig = new DocumentBuilder()
    .setTitle("TourUz's")
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api-swagger', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
    },
  });

  await app.listen(config.server.port, () => {
    console.log(`Server started on port ${config.server.port}`);
  });
}

bootstrap();
