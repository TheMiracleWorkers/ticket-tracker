import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import TicketHeader from "./TicketHeader";
import { Divider } from "@mui/material";
import TicketBody from "./TicketBody";
import Ticket, { TicketInterface } from "../../domainObjects/Ticket";
import { TransportLayer } from "../../transportation/TransportLayer";
import { AxiosResponse } from "axios";

const transportLayer = new TransportLayer();

function ViewTicket(props: {ticketId: number}) {
  const [ticketState, setTicketState] = useState<TicketInterface>();

    useEffect(() => {
    // transportLayer.getAllTickets(onAllTicketsReceive);
    setTicketState(new Ticket({
    id: 5,
    title: 'ioueabrg',
    description: 'test description',
    dueDate: Date.now(),
    createdDate: Date.now(),
    updatedDate: Date.now()
  })) 
  }, []);

    function fetchOneTicket() {
    transportLayer
    .getTicketByIdPromise(1)
    .then((response: AxiosResponse) => {
        const ticket: Ticket = new Ticket(response.data)
        setTicketState(ticket);
      })
      .catch((response: AxiosResponse) => {
        // Handle error.
        console.log(response);
      });
  }



  if (ticketState) {
      return (
    <React.Fragment>
      <Grid
        container
        spacing={{ md: 0 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
        padding={{ md: 0.6 }}
        justifyContent={"space-between"}
      >
        <TicketHeader ticket={ticketState}/>
        <Divider style={{ width: "100%", margin: 20 }} />
        <TicketBody />
      </Grid>
    </React.Fragment>
  );
  } else {
    return <React.Fragment>Loading</React.Fragment>
  }

}

export default ViewTicket;
