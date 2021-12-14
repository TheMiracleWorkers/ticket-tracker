import axios from "axios";
import Ticket from "../domainObjects/Ticket";
import Project from "../domainObjects/Project";
import inMemoryJWT from "../domainObjects/inMemoryJWTManager";
import { UserRegistrationInterface } from "../domainObjects/UserRegistration";

export class TransportLayer {
  apiUrl = process.env.REACT_APP_REST_API;
  axiosInstance = axios.create({
    baseURL: this.apiUrl,
    headers: {
      Authorization: `JWT ${localStorage.getItem("token")}`,
    },
  });

  getAllTicketsPromise() {
    return this.axiosInstance.request({
      method: "GET",
      url: "/tickets",
      headers: {
        Authorization: `JWT ${inMemoryJWT.getToken()}`,
      },
    });
  }

  getTicketByIdPromise(id: number) {
    return this.axiosInstance.request({
      method: "GET",
      url: "/tickets/" + id,
      headers: {
        Authorization: `JWT ${inMemoryJWT.getToken()}`,
      },
    });
  }

  postTicket(ticket: Ticket) {
    return this.axiosInstance.request({
      method: "POST",
      url: "/tickets/",
      data: ticket.toJSON(),
      headers: {
        Authorization: `JWT ${inMemoryJWT.getToken()}`,
      },
    });
  }

  updateTicketPromise(ticket: Ticket) {
    return this.axiosInstance.request({
      method: "PUT",
      url: "/tickets/" + ticket.id + "/",
      data: ticket.toJSON(),
      headers: {
        Authorization: `JWT ${inMemoryJWT.getToken()}`,
      },
    });
  }

  getAllProjectPromise() {
    return this.axiosInstance.request({
      method: "GET",
      url: "/projects",
      headers: {
        Authorization: `JWT ${inMemoryJWT.getToken()}`,
      },
    });
  }

  getProjectByIdPromise(id: number) {
    return this.axiosInstance.request({
      method: "GET",
      url: "/projects/" + id,
      headers: {
        Authorization: `JWT ${inMemoryJWT.getToken()}`,
      },
    });
  }

  postProject(project: Project) {
    return this.axiosInstance.request({
      method: "POST",
      url: "/projects/",
      data: project.toJSON(),
      headers: {
        Authorization: `JWT ${inMemoryJWT.getToken()}`,
      },
    });
  }

  updateProjectPromise(project: Project) {
    return this.axiosInstance.request({
      method: "PUT",
      url: "/projects/" + project.id + "/",
      data: project.toJSON(),
      headers: {
        Authorization: `JWT ${inMemoryJWT.getToken()}`,
      },
    });
  }

  deleteProject(project: Project) {
    return this.axiosInstance.request({
      method: "DELETE",
      url: "/projects/" + project.id + "/",
      headers: {
        Authorization: `JWT ${inMemoryJWT.getToken()}`,
      },
    });
  }

  registerUserPromise(userRegistration: UserRegistrationInterface) {
    return this.axiosInstance.request({
      method: "POST",
      url: "/register/",
      data: JSON.stringify(userRegistration),
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
