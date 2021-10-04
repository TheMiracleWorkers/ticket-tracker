import { TransportLayer } from "../transportation/TransportLayer";
import React, { useState, useEffect } from "react";
import { Ticket } from "../stores/TicketStore";

const transportLayer = new TransportLayer();

function TransportLayerTest() {
  const [ticketState, setTicketState] = useState<Ticket[]>([]);

  useEffect(() => {
    // transportLayer.getAllTickets(onAllTicketsReceive);
    transportLayer
      .getAllTicketsPromise()
      .then((response) => {
        const tickets: Ticket[] = response.data;
        setTicketState(tickets);
      })
      .catch((response) => {
        // Handle error.
        console.log(response);
      });
  }, []);

  const onAllTicketsReceive = (tickets: Ticket[]) => {
    console.log("To be ticket state: ", tickets);
    setTicketState(tickets);
  };

  return (
    <div>
      {!Array.isArray(ticketState) || !ticketState.length
        ? "Loading"
        : ticketState.map((ticket) => <p>{"title: " + ticket.description}</p>)}
    </div>
  );
}

export default TransportLayerTest;
