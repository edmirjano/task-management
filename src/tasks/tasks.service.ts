import { Injectable, NotFoundException } from '@nestjs/common';
import { StatusEnum, Task } from './taks.model';
import { v4 as idGenerator } from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filters.dt';
import { NotFoundError } from 'rxjs';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';

@Injectable()
export class TasksService {
    private tasks: Task[] = []
    constructor(){}


    getTasks(filterDto: GetTasksFilterDto): Task[] {
        let tasks = this.tasks;
        if (filterDto) {
            const { title, status } = filterDto;
            if(title)
                tasks = tasks.filter(x => x.title.includes(title));
            if(status)
                tasks = tasks.filter(x => x.status.includes(status));
            return tasks;
        }
        return tasks;
    }


    createTask(CreateTaskDto: CreateTaskDto): Task {
        const { title, description } = CreateTaskDto;
        const task: Task  = {
            id: idGenerator(),
            title,
            description,
            status: StatusEnum.OPEN
        }
        this.tasks.push(task);
        return task;
    }


    getById(id: string): Task{
        const found = this.tasks.find(x => x.id == id);
        if (!found)
            throw new NotFoundException('Not found task: ' + id);
        return found;
    }

    delete(id: string){
        this.getById(id);
        this.tasks = this.tasks.filter(x => x.id != id);
    }

    update(id: string, updateStatusDto: UpdateTaskStatusDto): Task{
        const { status } = updateStatusDto;
        const index = this.tasks.findIndex(x => x.id == id);
        this.tasks[index].status = status;
        return this.tasks[index];
    }
}
