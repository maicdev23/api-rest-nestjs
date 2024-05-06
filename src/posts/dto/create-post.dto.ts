import { IsNumber, IsString } from "class-validator";

export class CreatePostDto {

    @IsString()
    context: string;

    @IsNumber()
    user: number;

}
