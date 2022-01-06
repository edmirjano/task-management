import { IsEnum } from "class-validator";
import { StatusEnum } from "../taks.model";

export class UpdateTaskStatusDto{
    @IsEnum(StatusEnum)
    status: StatusEnum
}