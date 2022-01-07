import { IsEnum, IsOptional, IsString } from "class-validator";
import { TaskStatus } from "../taks-status.model";

export class GetTasksFilterDto {
    @IsOptional()
    @IsString()
    title: string;
    @IsOptional()
    @IsEnum(TaskStatus)
    status: string;
}