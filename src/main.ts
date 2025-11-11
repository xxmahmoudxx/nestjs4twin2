import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,        // Supprime les propriétés non définies dans le DTO
      forbidNonWhitelisted: true, // Génère une erreur si des propriétés non définies sont envoyées
      transform: true,        // Transforme automatiquement les types (ex: string -> number)
    }),
  );
  await app.listen(process.env.PORT ?? 3000);


  

}
bootstrap();
