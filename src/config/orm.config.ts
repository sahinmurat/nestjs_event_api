import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { Event } from "../events/event.entity";
import { registerAs } from "@nestjs/config";
import { Attendee } from "../events/attendee.entity";
import { Subject } from "../school/subject.entity";
import { Teacher } from "../school/teacher.entity";

export default registerAs('orm.config', (): TypeOrmModuleOptions => ({
    type: 'postgres',
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    entities: [Event, Attendee, Subject, Teacher],
    // Setting synchronize: true shouldn't be used in production - otherwise you can lose production data.
    synchronize: true,
}))