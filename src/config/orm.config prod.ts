import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { Event } from "../events/event.entity";
import { registerAs } from "@nestjs/config";

export default registerAs('orm.config', (): TypeOrmModuleOptions => ({
    type: 'mysql',
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    entities: [Event],
    // Setting synchronize: true shouldn't be used in production - otherwise you can lose production data.
    synchronize: false,
}))