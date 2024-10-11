import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import * as cors from "cors";

async function main() {

  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api/')

  app.use(cors())

  app.useGlobalPipes(new ValidationPipe({}))

  // #region CONFIG SWAGGER
  const config = new DocumentBuilder()
    .setTitle('API Documentation')
    .setDescription('API Documentation for example in rest services')
    .setVersion('1.0')
    .addBearerAuth()
    .build()

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);

  //#endregion

  await app.listen(process.env.PORT || 5000);

}; main();
