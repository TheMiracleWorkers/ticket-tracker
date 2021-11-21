export interface TicketInterface {
    id: number | null;
    title: string;
    description: string;
    dueDate: Date | null;
    createdDate: Date | null;
    updatedDate: Date | null;
    priority: number | null;
    project: number | null;
    project_name: string;
}

export default class Ticket implements TicketInterface{
    id: number;
    title: string;
    description: string;
    dueDate: Date | null;
    createdDate: Date | null;
    updatedDate: Date | null;
    priority: number | null;
    project: number | null;
    project_name: string;

    constructor(json: any) {
        this.id = json.id ? json.id : null;
        this.title = json.title;
        this.description = json.description;
        this.dueDate = json.due_date ? new Date(json.due_date) : null;
        this.createdDate = json.created_at ? new Date(json.created_at) : null;
        this.updatedDate = json.updated_at ? new Date(json.updated_at) : null;
        this.priority = json.priority ? json.priority : null;
        this.project = json.project ? json.project : null;
        this.project_name = json.project_name;
    }

    toJSON() {
        return {
            id: this.id ? this.id : '',
            title: this.title,
            description: this.description,
            due_date: this.dueDate ? this.dueDate.toISOString() : null,
            created_at: this.createdDate?.toUTCString(),
            updated_at: this.createdDate?.toUTCString(),
            priority: this.priority,
            project: this.project,
            project_name: this.project_name,
        }
    }
}