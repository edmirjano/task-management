import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filters.dt';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';
import { Task } from './tasks.entity';
import { TasksService } from './tasks.service';


@Controller('tasks')
export class TasksController {
    constructor(private taskService: TasksService) {}

    @Get()
    async getTasks(@Query() filterDto: GetTasksFilterDto): Promise<Task[]>{
        return await this.taskService.getTasks(filterDto);
    }

    @Get('/:id')
    async getById(@Param('id') id: string): Promise<Task>{
        return await this.taskService.getById(id);
    }

    @Post()
    async createTask(@Body() CreateTaskDto: CreateTaskDto): Promise<Task> {
        return await this.taskService.createTask(CreateTaskDto);
    }

    @Patch('/:id/status')
    async updateTask(@Param('id') id: string, @Body() updateStatusDto: UpdateTaskStatusDto): Promise<Task>{
        return await this.taskService.update(id,updateStatusDto);
    }

    @Delete('/:id')
    async deleteTask(@Param('id') id: string): Promise<void>{
       return this.taskService.delete(id);
    }
}
