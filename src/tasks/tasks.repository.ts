import { EntityRepository, Repository } from "typeorm";
import { Task } from "./tasks.entity";
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskStatus } from "./taks-status.model";
import { UpdateTaskStatusDto } from "./dto/update-task-status.dto";
import { NotFoundException } from "@nestjs/common";
import { GetTasksFilterDto } from "./dto/get-tasks-filters.dt";

@EntityRepository(Task)
export class TasksRepository extends Repository<Task> {

    async get(id: string): Promise<Task>{
        const found = await this.findOne({ id: id});
        if (!found)
            throw new NotFoundException('Not found task: ' + id);
        return found;
    } 

    async search(filterDto: GetTasksFilterDto): Promise<Task[]>{
        const query = this.createQueryBuilder('task');
        if (filterDto) {
            const { title, status } = filterDto;
            if(title)
                query.andWhere('LOWER(task.title) LIKE LOWER(:title)', { title: `%${title}%` });
            if(status)
                query.andWhere('task.status = :status', { status });
        }
        const tasks = await query.getMany();
        return tasks;
    }

    async createTask(createTaskDto: CreateTaskDto): Promise<Task>{
        const { title, description } = createTaskDto;
        const task = this.create({
            title,
            description,
            status: TaskStatus.OPEN
        });
        await this.save(task);
        return task;
    }

    async updateTask(id: string, updateStatusDto: UpdateTaskStatusDto): Promise<Task>{
        await this.get(id);
        const taskToUpdate = await this.update({ id: id},updateStatusDto);
        return await this.findOne({id: id});
    }

    async deleteTask(id: string): Promise<void>{
        const toBeDeleted = await this.delete({ id: id});
        if(toBeDeleted.affected === 0)
            throw new NotFoundException('Not found task: ' + id);
    }
}