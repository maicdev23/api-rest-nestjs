import { IsString } from "class-validator";

export class CreatePostDto {

    @IsString()
    context: string;

}
