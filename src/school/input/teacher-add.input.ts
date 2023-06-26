import { Field, InputType } from "@nestjs/graphql";
import { IsEnum, IsNotEmpty } from "class-validator";
import { Gender } from "../school.types";

@InputType()
export class TeacherAddInput {
    @Field()
    @IsNotEmpty()
    name: string;

    @Field(() => Gender)
    @IsNotEmpty()
    @IsEnum(Gender)
    gender: Gender
}
