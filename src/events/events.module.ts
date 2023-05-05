import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { EventController } from './events.controller';

@Module({
    imports: [TypeOrmModule.forFeature([Event])],
    controllers: [EventController]
})
export class EventsModule { }
