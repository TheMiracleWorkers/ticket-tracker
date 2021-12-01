export interface RoleInterface {
    url: string;
    name: string;
}

export default class Role implements RoleInterface {
    url: string;
    name: string;

    constructor(json: any) {
        this.url = json.url;
        this.name = json.name;
    }

    toJSON() {
        return {
            url: this.url,
            name: this.name
        }
    }
}