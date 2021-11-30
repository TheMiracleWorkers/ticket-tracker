import axios from "axios";
import Ticket from "../domainObjects/Ticket";
import Project from "../domainObjects/Project";

export class TransportLayer {
    apiUrl = process.env.REACT_APP_REST_API;
    axiosInstance = axios.create({
        baseURL: this.apiUrl,
    });

    getAllTicketsPromise() {
        return this.axiosInstance.request({
            method: "GET",
            url: "/tickets",
            headers: {
                Authorization: `JWT ${localStorage.getItem('token')}`
            }
        });
    }

    getTicketByIdPromise(id: number) {
        return this.axiosInstance.request({
            method: "GET",
            url: "/tickets/" + id,
            headers: {
                Authorization: `JWT ${localStorage.getItem('token')}`
            }
        });
    }

    postTicket(ticket: Ticket) {
        return this.axiosInstance.request({
            method: "POST",
            url: "/tickets/",
            data: ticket.toJSON(),
            headers: {
                Authorization: `JWT ${localStorage.getItem('token')}`
            }
        })
    }

    updateTicketPromise(ticket: Ticket) {
        return this.axiosInstance.request({
            method: "PUT",
            url: "/tickets/" + ticket.id + "/",
            data: ticket.toJSON(),
            headers: {
                Authorization: `JWT ${localStorage.getItem('token')}`
            }
        });
    }

    getAllProjectPromise() {
        return this.axiosInstance.request({
            method: "GET",
            url: "/projects",
            headers: {
                Authorization: `JWT ${localStorage.getItem('token')}`
            }
        });
    }

    getProjectByIdPromise(id: number) {
        return this.axiosInstance.request({
            method: "GET",
            url: "/projects/" + id,
            headers: {
                Authorization: `JWT ${localStorage.getItem('token')}`
            }
        });
    }

    postProject(project: Project) {
        return this.axiosInstance.request({
            method: "POST",
            url: "/projects/",
            data: project.toJSON(),
            headers: {
                Authorization: `JWT ${localStorage.getItem('token')}`
            }
        })
    }

    updateProjectPromise(project: Project) {
        return this.axiosInstance.request({
            method: "PUT",
            url: "/projects/" + project.id + "/",
            data: project.toJSON(),
            headers: {
                Authorization: `JWT ${localStorage.getItem('token')}`
            }
        });
    }

    deleteProject(project: Project) {
        return this.axiosInstance.delete("/projects/" + project.id + "/", {
            headers: {
                        Authorization: `JWT ${localStorage.getItem('token')}`
            }
        });
    }

}
