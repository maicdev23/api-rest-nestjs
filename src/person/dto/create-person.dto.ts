import { IsNumber, IsString } from "class-validator";

export class CreatePersonDto {

    @IsString()
    fullname: string;

    @IsNumber()
    age: number;

    @IsString()
    address: string;

}
