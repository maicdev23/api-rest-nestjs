import { Transform } from "class-transformer";
import { IsEnum, IsOptional, IsString } from "class-validator";
import { Role } from "src/common/enums/role.enum";

export class CreateUserDto {

    @IsString()
    username: string;

    @Transform(({ value }) => value.trim())
    @IsString()
    password: string;

    @IsEnum(Role)
    @IsOptional()
    role: Role
}
