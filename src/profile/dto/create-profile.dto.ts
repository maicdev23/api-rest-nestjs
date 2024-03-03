import { IsString } from "class-validator";

export class CreateProfileDto {

    @IsString()
    fullname: string;

    @IsString()
    address: string;

    @IsString()
    phone: number;
}
