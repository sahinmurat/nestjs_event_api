import { Controller, Delete, Get, Patch, Post, Param, Body, HttpCode } from "@nestjs/common";
import { CreateEventDto } from "./create-event-dto";
import { UpdateEventDto } from "./update-event.dto";
import { Event } from "./event.entity";

@Controller('/events')
export class EventController {

    private events: Event[] = [];


    @Post()
    createEvent(@Body() input: CreateEventDto) {
        // spread operator
        const event: Event = {
            ...input,
            when: new Date(input.when),
            id: this.events.length + 1
        }
        this.events.push(event);
        return event;
    }

    @Patch(':id')
    @HttpCode(204)
    updateEvent(@Param('id') id, @Body('input') input: UpdateEventDto) {
        const event = this.events.find(event => event.id === parseInt(id));
        const index = this.events.indexOf(event);

        this.events[index] = {
            ...event,
            name: input.name || event.name,
            address: input.address || event.address,
            description: input.description || event.description,
            when: new Date(input.when) || new Date(event.when)
        };
    }

    @Delete(':id')
    deleteEvent(@Param('id') id: string) {
        this.events = this.events.filter(event => event.id !== parseInt(id));
        return this.events;
    }

    @Get(':id')
    getEvent(@Param('id') id: string) {
        return this.events.find(event => event.id === parseInt(id));
    }

    @Get()
    getEvents() {
        return this.events;
    }
}