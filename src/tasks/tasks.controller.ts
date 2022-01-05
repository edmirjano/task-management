import { Controller, Get } from '@nestjs/common';
import { TasksService } from './tasks.service';

@Controller('')
export class TasksController {
    constructor(
        private taskService: TasksService
    ) {}


    @Get()
    welcome(){
        return this.taskService.getHello();
    }
}
