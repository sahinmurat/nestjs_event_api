import { Controller, Delete, Get, Patch, Post, Param, Body, HttpCode, ParseIntPipe } from "@nestjs/common";
import { CreateEventDto } from "./create-event-dto";
import { UpdateEventDto } from "./update-event.dto";
import { Event } from "./event.entity";
import { MoreThan, Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";

@Controller('/events')
export class EventController {

    constructor(
        @InjectRepository(Event)
        private readonly repository: Repository<Event>) {
    }
    // *******************
    @Get('/practice')
    async practice() {
        return await this.repository.find({
            where: {
                id: MoreThan(2),
                when: MoreThan(new Date("2021-02-12T20:00:00.000Z"))
            }
        });
    }

    @Post()
    async createEvent(@Body() input: CreateEventDto) {
        // spread operator
        return await this.repository.save({
            ...input,
            when: new Date(input.when)
        })
    }

    @Patch(':id')
    @HttpCode(204)
    async updateEvent(@Param('id', ParseIntPipe) id, @Body('input') input: UpdateEventDto) {
        const event = await this.repository.findOne(id);
        return await this.repository.save({
            ...event,
            ...input,
            when: input.when ? new Date(input.when) : new Date()
        })
    }

    @Delete(':id')
    async deleteEvent(@Param('id') id) {
        const event = await this.repository.findOne(id);
        await this.repository.remove(event);
    }

    @Get(':id')
    async getEvent(@Param('id', ParseIntPipe) id) {
        return await this.repository.findOne(id);
    }

    @Get()
    async getEvents() {
        return await this.repository.find();
    }
}