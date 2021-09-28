import axios from "axios";
import { Ticket } from "../stores/TicketStore";

export class TransportLayer {
  apiUrl = process.env.REACT_APP_REST_API;

  getAllTickets(onAllTicketsReceive: Function) {
    var allTickets: Ticket[];
    if (this?.apiUrl === undefined) {
      console.log('API string undefined in environment variables ".env"');
    }
    axios
      .get(this.apiUrl + "tickets")
      .then((tickets) => {
        allTickets = tickets.data;
        console.log("Transport Layer Fetched: ", allTickets);
        onAllTicketsReceive(allTickets);
      })
      .catch((error) => {
        console.log(error);
      });
  }
}
