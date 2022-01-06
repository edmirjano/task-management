export interface Task {
    id: string;
    title: string;
    description: string;
    status: StatusEnum;
}

export enum StatusEnum {
    OPEN = 'OPEN',
    IN_PROGRESS = 'IN_PROGRESS',
    DONE = 'DONE',
}