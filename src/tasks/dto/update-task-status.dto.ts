import { IsEnum } from "class-validator";
import { TaskStatus } from "../taks-status.model";

export class UpdateTaskStatusDto{
    @IsEnum(TaskStatus)
    status: TaskStatus
}