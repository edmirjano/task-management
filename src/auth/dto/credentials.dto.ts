import { IsNotEmpty, IsString, Matches, MaxLength, MinLength } from "class-validator";

export class CredentialsDto {
    @IsString()
    @MinLength(4)
    @MaxLength(10)
    username: string;
    @IsString()
    @MinLength(4)
    @MaxLength(10)
    @Matches(/(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, { message: 'make it more creepy'})
    password: string;
}