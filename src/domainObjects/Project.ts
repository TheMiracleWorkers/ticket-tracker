export interface ProjectInterface {
    id: number | null;
    name: string;
}

export default class Project implements ProjectInterface {
    id: number;
    name: string;

    constructor(json: any) {
        this.id = json.id ? json.id : null;
        this.name = json.name;
    }

    toJSON() {
        return {
            id: this.id ? this.id : '',
            name: this.name,
        }
    }
}