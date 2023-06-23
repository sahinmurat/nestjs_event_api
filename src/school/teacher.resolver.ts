
import { Resolver, Query, Args, Int, Mutation } from '@nestjs/graphql';
import { Teacher } from './teacher.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { TeacherAddInput } from './input/teacher-add.input';

@Resolver(() => Teacher)
export class TeacherResolver {
    constructor(
        @InjectRepository(Teacher)
        private readonly teachersRepository: Repository<Teacher>,
    ) { }

    @Query(() => [Teacher])
    public async teachers(): Promise<Teacher[]> {
        return await this.teachersRepository.find();
    }

    @Query(() => Teacher)
    public async teacher(
        @Args('id', { type: () => Int })
        id: number
    ): Promise<Teacher> {
        return await this.teachersRepository.findOneOrFail({
            where: {
                id: id
            }
        })
    }

    @Mutation(() => Teacher, { name: 'teacherAdd' })
    public async add(
        @Args('input', { type: () => TeacherAddInput })
        input: TeacherAddInput
    ): Promise<Teacher> {
        return await this.teachersRepository.save(new Teacher(input));
    }
}