import { TransportLayer } from "../transportation/TransportLayer";
import React, { useState, useEffect } from "react";
import Ticket from "../domainObjects/Ticket";
import { AxiosResponse } from "axios";

const transportLayer = new TransportLayer();

function TransportLayerTest() {
  const [ticketArrayState, setTicketArrayState] = useState<Ticket[]>([]);
  const [ticketState, setTicketState] = useState<Ticket>();
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    // transportLayer.getAllTickets(onAllTicketsReceive);
    fetchAllTicket();
    fetchOneTicket();
    postTicket();
  }, []);

  function fetchAllTicket() {
    transportLayer
      .getAllTicketsPromise()
      .then((response: any) => {
        const allTickets: Ticket[] = response.data.map(
          (responseElement: any) => new Ticket(responseElement)
        );
        setTicketArrayState(allTickets);
        setLoading(false);
      })
      .catch((response: AxiosResponse) => {
        // Handle error.
        console.log('response');
      });
    setLoading(true);
  }

  function fetchOneTicket() {
    transportLayer
      .getTicketByIdPromise(1)
      .then((response: AxiosResponse) => {
        const ticket: Ticket = new Ticket(response.data);
        setTicketState(ticket);
      })
      .catch((response: AxiosResponse) => {
        // Handle error.
        console.log(response);
      });
  }

  function postTicket() {
    const newTicket = new Ticket({
      title: "test title " + new Date().getSeconds(),
      description: "test description",
    });
    transportLayer
      .postTicket(newTicket)
      .then((response: any) => {
        const postedTicket = new Ticket(response.data);
        console.log("ticket posted id: " + postedTicket.id);
      })
      .catch((response: AxiosResponse) => {
        console.log(response);
      });
  }

  // What to do when all tickets are received.
  // eslint-disable-next-line
  const onAllTicketsReceive = (tickets: Ticket[]) => {
    console.log("To be ticket state: ", tickets);
    setTicketArrayState(tickets);
  };

  return (
    <div>
      <p>Test list</p>
      {isLoading
        ? "Loading"
        : ticketArrayState.map((ticket) => (
            <div>
              <p>{"id: " + ticket.id}</p>
              <p>{"title: " + ticket.title}</p>
              <p>{"description: " + ticket.description}</p>
              <p>{"due date: " + ticket.dueDate}</p>
              <p>{"created date: " + ticket.createdDate}</p>
              <p>{"update date: " + ticket.dueDate}</p>
              <hr />
            </div>
          ))}
      <p>Test single item</p>
      <p>{"id: " + ticketState?.id}</p>
      <p>{"title: " + ticketState?.title}</p>
      <p>{"description: " + ticketState?.description}</p>
      <p>{"due date: " + ticketState?.dueDate}</p>
      <p>{"created date: " + ticketState?.createdDate}</p>
      <p>{"update date: " + ticketState?.dueDate}</p>
    </div>
  );
}

export default TransportLayerTest;
