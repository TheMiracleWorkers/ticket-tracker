import axios from "axios";
import User from "../domainObjects/User";
import inMemoryJWT from "../domainObjects/inMemoryJWTManager";

export class TransportUsers {
    apiUrl = process.env.REACT_APP_REST_API;
    axiosInstance = axios.create({
        baseURL: this.apiUrl,
        headers: {
            Authorization: `JWT ${inMemoryJWT.getToken()}`
        },
    });


    getAllUsersPromise() {
        return this.axiosInstance.request({
            method: "GET",
            url: "/users",
            headers: {
                Authorization: `JWT ${inMemoryJWT.getToken()}`
            },
        });
    }

    getUserByIdPromise(id: number) {
        return this.axiosInstance.request({
            method: "GET",
            url: "/users/" + id,
            headers: {
                Authorization: `JWT ${inMemoryJWT.getToken()}`
            },
        });
    }

    postUser(User: User) {
        return this.axiosInstance.request({
            method: "POST",
            url: "/users/",
            data: User.toJSON(),
            headers: {
                Authorization: `JWT ${inMemoryJWT.getToken()}`
            },
        })
    }

    updateUserPromise(User: User) {
        return this.axiosInstance.request({
            method: "PUT",
            url: "/users/" + User.id + "/",
            data: User.toJSON(),
            headers: {
                Authorization: `JWT ${inMemoryJWT.getToken()}`
            },
        });
    }
}
