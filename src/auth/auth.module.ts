import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { LocalStrategy } from './local.strategy';
import { AuthController } from './auth.controller';
import { Attendee } from '../events/attendee.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([User, Attendee])],
    controllers: [AuthController],
    providers: [LocalStrategy],
})
export class AuthModule { }