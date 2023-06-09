import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Attendee } from '../events/attendee.entity';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { LocalStrategy } from './local.strategy';
import { User } from './user.entity';
import { UsersController } from './users.conroller';

@Module({
    imports: [
        TypeOrmModule.forFeature([User, Attendee]),
        JwtModule.registerAsync({
            useFactory: () => ({
                secret: process.env.JWT_SECRET,
                signOptions: { expiresIn: '60m' }
            })
        })
    ],
    providers: [LocalStrategy, JwtStrategy, AuthService],
    controllers: [AuthController, UsersController],
})
export class AuthModule { }