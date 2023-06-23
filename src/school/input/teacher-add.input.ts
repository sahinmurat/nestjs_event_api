import { Field, InputType } from "@nestjs/graphql";
import { IsNotEmpty } from "class-validator";

@InputType()
export class TeacherAddInput {
    @Field()
    @IsNotEmpty()
    name: string;
}
