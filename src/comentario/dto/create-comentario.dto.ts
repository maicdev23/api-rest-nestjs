import { IsNumber, IsString } from "class-validator";

export class CreateComentarioDto {

    @IsString()
    comentario: string;

    @IsNumber()
    post: number;

}
