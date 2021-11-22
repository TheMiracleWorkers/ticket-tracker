import React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { TicketInterface } from "../../domainObjects/Ticket";

function TicketBody(props: { ticket: TicketInterface | undefined }) {
  const ticket = props.ticket;


  if (ticket) {
    return (
        <Grid item xs={4} sm={8} md={12}>

          <Typography variant="body1">
            <strong>Description</strong>
          </Typography>
          <Typography variant="body1">
            {ticket.description}
          </Typography>


        </Grid>
    );
  } else {
    return <p>loading...</p>;
  }
}

export default TicketBody;
