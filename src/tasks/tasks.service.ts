import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filters.dt';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';
import { TasksRepository } from './tasks.repository';
import { Task } from './tasks.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TasksService {
    constructor(@InjectRepository(TasksRepository) private taskRepository: TasksRepository){}

    async getTasks(filterDto: GetTasksFilterDto): Promise<Task[]> {
        return await this.taskRepository.search(filterDto);
    }

    async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
        return await this.taskRepository.createTask(createTaskDto);
    }

    async getById(id: string): Promise<Task>{
        return await this.taskRepository.get(id);
    }

    async delete(id: string): Promise<void>{
        return await this.taskRepository.deleteTask(id);
    }

    async update(id: string, updateStatusDto: UpdateTaskStatusDto): Promise<Task>{
        return await this.taskRepository.updateTask(id, updateStatusDto);
    }
}
