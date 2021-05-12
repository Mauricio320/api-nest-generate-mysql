import { databaseModule } from './database.module';
import { AppController } from './app.controller';
import { ConfigModule } from '@nestjs/config';
import { AppService } from './app.service';
import { Module } from '@nestjs/common';

@Module({
  imports: [ConfigModule.forRoot(), databaseModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
