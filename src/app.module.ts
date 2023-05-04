import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EventController } from './events.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Event } from './event.entity';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'mysql',
    host: '127.0.0.1',
    port: 3306,
    username: 'root',
    password: 'example',
    database: 'nest-events',
    entities: [Event],
    // Setting synchronize: true shouldn't be used in production - otherwise you can lose production data.
    synchronize: true,
  })],
  controllers: [AppController, EventController],
  providers: [AppService],
})
export class AppModule { }
