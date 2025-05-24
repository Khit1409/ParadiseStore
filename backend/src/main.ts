import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  //create app
  const app = await NestFactory.create(AppModule);
  //
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // loại bỏ các trường không có trong DTO
      forbidNonWhitelisted: true, // nếu có trường lạ thì trả lỗi
      transform: true, // tự động chuyển kiểu dữ liệu
    }),
  );
  //thêm /api
  app.setGlobalPrefix('api');
  //run app
  await app.listen(Number(process.env.PORT) || 3000);
}
/* eslint-disable @typescript-eslint/no-floating-promises*/
bootstrap();
