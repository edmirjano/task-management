import { IsEnum, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { StatusEnum } from "../taks.model";

export class GetTasksFilterDto {
    @IsOptional()
    @IsString()
    title: string;
    @IsOptional()
    @IsEnum(StatusEnum)
    status: string;
}