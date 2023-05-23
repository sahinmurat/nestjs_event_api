import { Body, Controller, Delete, Get, HttpCode, Logger, Param, ParseIntPipe, Patch, Post } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Like, MoreThan, Repository } from "typeorm";
import { CreateEventDto } from './create-event.dto';
import { Event } from './event.entity';
import { UpdateEventDto } from "./update-event.dto";
import { Attendee } from "./attendee.entity";

@Controller('/events')
export class EventsController {
    private readonly logger = new Logger(EventsController.name);

    constructor(
        @InjectRepository(Event)
        private readonly repository: Repository<Event>,

        @InjectRepository(Attendee)
        private readonly attendeeRepository: Repository<Attendee>
    ) { }

    @Get()
    async findAll() {
        this.logger.log(`Hit the findAll route`);

        const events = await this.repository.find();
        this.logger.debug(`Found ${events.length} events`);
        return events;
    }

    @Get('/practice')
    async practice() {
        this.logger.log(`Hit the practice route`);
        this.logger.debug('test debug');
        return await this.repository.find({
            select: ['id', 'when'],
            where: [{
                id: MoreThan(3),
                when: MoreThan(new Date('2021-02-12T13:00:00'))
            }, {
                description: Like('%meet%')
            }],
            take: 2,
            order: {
                id: 'DESC'
            }
        });
    }


    @Get('/practice2')
    async practice2() {
        // return await this.repository.findOne({
        //     relations: ['attendees'],
        // where: {
        //     id: 1
        // },
        // })

        // const event = await this.repository.findOne({ relations: ['attendees'], where: { id: 3 } })
        // console.log('event', event);
        // const attendee = new Attendee()
        // attendee.id = 5
        // attendee.name = 'Mehmet Serhat'
        // attendee.event = event

        // await this.attendeeRepository.save(attendee)
        // return event

        const attendee = new Attendee()
        // attendee.id = 66
        attendee.name = 'Meliha 2'

        const event = new Event()
        // event.id = 12
        event.name = 'Work in garden 2'
        event.address = "Hollenbach"
        event.description = "Planting the flower"
        event.when = new Date()
        event.attendees = [attendee]

        try {
            await this.repository.save(event)
        } catch (error) {
            console.log('error saving event', error);
        }

        return event
    }



    @Get(':id')
    async findOne(@Param('id', ParseIntPipe) id) {
        // console.log(typeof id);
        return await this.repository.findOne(id);
    }

    // You can also use the @UsePipes decorator to enable pipes.
    // It can be done per method, or for every method when you
    // add it at the controller level.
    @Post()
    async create(@Body() input: CreateEventDto) {
        return await this.repository.save({
            ...input,
            when: new Date(input.when)
        });
    }

    // Create new ValidationPipe to specify validation group inside @Body
    // new ValidationPipe({ groups: ['update'] })
    @Patch(':id')
    async update(
        @Param('id') id,
        @Body() input: UpdateEventDto
    ) {
        const event = await this.repository.findOne(id);

        return await this.repository.save({
            ...event,
            ...input,
            when: input.when ? new Date(input.when) : event.when
        });
    }

    @Delete(':id')
    @HttpCode(204)
    async remove(@Param('id') id) {
        const event = await this.repository.findOne(id);
        await this.repository.remove(event);
    }
}