import axios from "axios";
import User from "../domainObjects/User";

export class TransportUsers {
    apiUrl = process.env.REACT_APP_REST_API;
    axiosInstance = axios.create({
        baseURL: this.apiUrl,
        headers: {
            Authorization: `JWT ${localStorage.getItem('token')}`
        }
    });


    getAllUsersPromise() {
        return this.axiosInstance.request({
            method: "GET",
            url: "/users",
        });
    }

    getUserByIdPromise(id: number) {
        return this.axiosInstance.request({
            method: "GET",
            url: "/users/" + id,
        });
    }

    postUser(User: User) {
        return this.axiosInstance.request({
            method: "POST",
            url: "/users/",
            data: User.toJSON(),
        })
    }

    updateUserPromise(User: User) {
        return this.axiosInstance.request({
            method: "PUT",
            url: "/users/" + User.id + "/",
            data: User.toJSON(),
        });
    }
}
