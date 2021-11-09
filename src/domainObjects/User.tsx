export interface UserInterface {
    id: number | null;
    name: string;
    role: string;
    projects: string;
    dateOfBirth: Date | null;
    created: Date | null;
}

export default class User implements UserInterface{
    id: number;
    name: string;
    role: string;
    projects: string;
    dateOfBirth: Date | null;
    created: Date | null;

    constructor(json: any) {
        this.id = json.id ? json.id : null;
        this.name = json.name;
        this.role = json.role;
        this.projects = json.projects;
        this.dateOfBirth = json.dateOfBirth ? new Date(json.dateOfBirth) : null;
        this.created = json.created ? new Date(json.created) : null;
    }

    toJSON() {
        return {
            id: this.id ? this.id : '',
            title: this.name,
            description: this.role,
            due_date: this.projects,
            created_at: this.dateOfBirth,
            updated_at: this.created
        }
    }
}