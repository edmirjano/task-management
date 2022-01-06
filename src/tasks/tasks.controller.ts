import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filters.dt';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';
import { StatusEnum, Task } from './taks.model';
import { TasksService } from './tasks.service';


@Controller('tasks')
export class TasksController {
    constructor(
        private taskService: TasksService
    ) {}


    @Get()
    getTasks(@Query() filterDto: GetTasksFilterDto): Task[]{
        return this.taskService.getTasks(filterDto);
    }

    @Get('/:id')
    getById(@Param('id') id: string): Task{
        return this.taskService.getById(id);
    }

    @Post()
    createTask(@Body() CreateTaskDto: CreateTaskDto): Task {
        return this.taskService.createTask(CreateTaskDto);
    }


    @Patch('/:id/status')
    updateTask(@Param('id') id: string, @Body() updateStatusDto: UpdateTaskStatusDto): Task{
        return this.taskService.update(id,updateStatusDto);
    }

    @Delete('/:id')
    deleteTask(@Param('id') id: string): void{
        this.taskService.delete(id);
    }

}
