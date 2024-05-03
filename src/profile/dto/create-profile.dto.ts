import { IsNumber, IsString } from "class-validator";

export class CreateProfileDto {

    @IsString()
    fullname: string;

    @IsString()
    address: string;

    @IsNumber()
    phone: number;
}
