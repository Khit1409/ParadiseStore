import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
async function bootstrap() {
  //create app
  const app = await NestFactory.create(AppModule);
  //cors
  app.enableCors({
    origin: 'http://localhost:3000', // cho phép frontend truy cập
    credentials: true, // nếu bạn dùng cookie
  });
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // loại bỏ các trường không có trong DTO
      forbidNonWhitelisted: true, // nếu có trường lạ thì trả lỗi
      transform: true, // tự động chuyển kiểu dữ liệu
    }),
  );

  // parse cookie từ request
  /*eslint-disable @typescript-eslint/no-unsafe-call */
  app.use(cookieParser());
  //thêm /api
  app.setGlobalPrefix('api');
  //run app
  await app.listen(Number(process.env.PORT));
}
/* eslint-disable @typescript-eslint/no-floating-promises*/
bootstrap();
