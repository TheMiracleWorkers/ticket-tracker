import axios from "axios";
import Ticket from "../domainObjects/Ticket";

export class TransportLayer {
  apiUrl = process.env.REACT_APP_REST_API;
  axiosInstance = axios.create({
    baseURL: this.apiUrl,
  });

  getAllTickets(onAllTicketsReceive: Function) {
    if (this?.apiUrl === undefined) {
      console.log('API string undefined in environment variables ".env"');
    }
    axios
      .get(this.apiUrl + "tickets")
      .then((response: any) => {
        const allTickets: Ticket[] = response.data.map((responseElement: any) => new Ticket(responseElement));
        onAllTicketsReceive(allTickets);
      })
      .catch((error: any) => {
        console.log(error);
      });
  }

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
}
