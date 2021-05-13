import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { config } from 'dotenv';

config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT);
  const logger = new Logger()
  logger.log(`Servidor iniciado en ${await app.getUrl()}`)
}
bootstrap();
