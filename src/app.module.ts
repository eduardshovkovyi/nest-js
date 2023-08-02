import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodoModule } from './modules/todo/todo.module';
import databaseConfig from '../database.config';

@Module({
  imports: [TypeOrmModule.forRoot(databaseConfig), TodoModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
