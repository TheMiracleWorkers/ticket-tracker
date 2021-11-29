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
    });
  }

  getTicketByIdPromise(id: number) {
    return this.axiosInstance.request({
      method: "GET",
      url: "/tickets/" + id,
    });
  }

  postTicket(ticket: Ticket) {
    return this.axiosInstance.request({
      method: "POST",
      url: "/tickets/",
      data: ticket.toJSON()
    })
  }

  updateTicketPromise(ticket: Ticket) {
    return this.axiosInstance.request({
      method: "PUT",
      url: "/tickets/" + ticket.id + "/",
      data: ticket.toJSON()
    });
  }

  getAllProjectPromise() {
    return this.axiosInstance.request({
      method: "GET",
      url: "/projects",
    });
  }

  getProjectByIdPromise(id: number) {
    return this.axiosInstance.request({
      method: "GET",
      url: "/projects/" + id,
    });
  }

  postProject(project: Project) {
    return this.axiosInstance.request({
      method: "POST",
      url: "/projects/",
      data: project.toJSON()
    })
  }

  updateProjectPromise(project: Project) {
    return this.axiosInstance.request({
      method: "PUT",
      url: "/projects/" + project.id + "/",
      data: project.toJSON()
    });
  }

  deleteProject(project: Project){
    return this.axiosInstance.delete("/projects/" + project.id + "/");
  }


}
