export interface TicketInterface {
    id: number | null;
    title: string;
    description: string;
    status: string;
    dueDate: Date | null;
    createdDate: Date | null;
    updatedDate: Date | null;
    priority: number | null;
    project: number | null;
    project_name: string;
    assignedUserId: number | null;
    assignedUserName: string;
}

export default class Ticket implements TicketInterface {
    id: number;
    title: string;
    description: string;
    status: string;
    dueDate: Date | null;
    createdDate: Date | null;
    updatedDate: Date | null;
    priority: number | null;
    project: number | null;
    project_name: string;
    assignedUserId: number | null;
    assignedUserName: string;

    constructor(json: any) {
        this.id = json.id ? json.id : null;
        this.title = json.title;
        this.description = json.description;
        this.status = json.status ? json.status : 'Open'
        this.dueDate = json.due_date ? new Date(json.due_date) : null;
        this.createdDate = json.created_at ? new Date(json.created_at) : null;
        this.updatedDate = json.updated_at ? new Date(json.updated_at) : null;
        this.priority = json.priority ? json.priority : null;
        this.project = json.project ? json.project : null;
        this.project_name = json.project_name;
        this.assignedUserId = json.assigned_user ? json.assigned_user : null;
        this.assignedUserName = json.assigned_username;
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
            status: this.status,
            project: this.project,
            project_name: this.project_name,
            assigned_user: this.assignedUserId,
            assigned_username: this.assignedUserName
        }
    }
}