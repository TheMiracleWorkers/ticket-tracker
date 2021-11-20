export interface UserInterface {
    id: number | null;
    url: string;
    username: string;
    email: string;
    groups: string[];
    last_login: string | null;
    date_joined: string | null;
}

export default class User implements UserInterface{
    id: number;
    url: string;
    username: string;
    email: string;
    groups: string[];
    last_login: string | null;
    date_joined: string | null;

    constructor(json: any) {
        this.id = json.id ? json.id : null;
        this.url = json.url;
        this.username = json.username;
        this.email = json.email;
        this.groups = json.groups ? json.groups : null;
        this.last_login = json.last_login ? json.last_login : null;
        this.date_joined = json.date_joined ? json.date_joined : null;
    }

    toJSON() {
        return {
            id: this.id ? this.id : '',
            url: this.url,
            username: this.username,
            email: this.email,
            groups: this.groups,
            last_login: this.last_login,
            date_joined: this.date_joined,
        }
    }
}