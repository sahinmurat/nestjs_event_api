import { Controller, Post, Body, BadRequestException } from '@nestjs/common'
import { AuthService } from './auth.service';
import { CreateUserDto } from './input/create.user.dto';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Controller()
export class UsersController {

    constructor(
        private readonly authService: AuthService,
        @InjectRepository(User)
        private readonly userRepository: Repository<User>
    ) { }

    @Post("users")
    async create(@Body() createUserDto: CreateUserDto) {
        const user = new User();

        if (createUserDto.password !== createUserDto.retypedPassword) {
            throw new Error('Password do not match');
        }


        const existingUser = await this.userRepository.findOne({
            where: [
                { username: createUserDto.username },
                { email: createUserDto.email }
            ]
        });

        if (existingUser) {
            throw new BadRequestException(['User already exists']);
        }

        user.username = createUserDto.username;
        user.email = createUserDto.email;
        user.password = await this.authService.hashPassword(createUserDto.password)
        user.firstName = createUserDto.firstName;
        user.lastName = createUserDto.lastName;

        return {
            ...(await this.userRepository.save(user)),
            token: this.authService.getJwtToken(user)
        }


    }


}