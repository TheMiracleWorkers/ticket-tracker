import { TransportLayer } from "../transportation/TransportLayer";
import React, { useState, useEffect } from "react";
import { Ticket } from "../stores/TicketStore";

const transportLayer = new TransportLayer();

function TransportLayerTest() {
  const [ticketState, setTicketState] = useState<Ticket[]>([]);

  useEffect(() => {
    transportLayer.getAllTickets(onAllTicketsReceive);
  }, []);

  const onAllTicketsReceive = (tickets: Ticket[]) => {
    console.log("To be ticket state: ", tickets);
    setTicketState(tickets);
    console.log("State: " + ticketState);
  };

  return (
    <div>
      {!Array.isArray(ticketState) || !ticketState.length
        ? "Loading"
        : ticketState[0].description}
    </div>
  );
}

export default TransportLayerTest;
