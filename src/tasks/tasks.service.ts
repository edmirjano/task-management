import { Injectable } from '@nestjs/common';

@Injectable()
export class TasksService {

    constructor(){}

    getHello(){
        return "Hello";
    }
}
