import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.set('json spaces', 2); // JSON tampil rapi, berurutan ke bawah

  // ValidationPipe global: semua DTO otomatis divalidasi
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // buang field yang tidak ada di DTO
      forbidNonWhitelisted: true, // tolak field asing
      transform: true,
    }),
  );

  app.enableCors(); // agar frontend (file HTML) boleh memanggil API
  await app.listen(3000);
  console.log('Backend Ruang Cerita berjalan di http://localhost:3000');
}
bootstrap();
