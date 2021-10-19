import React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { TicketInterface } from "../../domainObjects/Ticket";

function TicketBody(props: { ticket: TicketInterface | undefined }) {
  const ticket = props.ticket;

  if (ticket) {
    return (
      <React.Fragment>
        <Grid item xs={3} sm={6} md={10}>
          <Typography variant="body1">
            <strong>Description</strong>
            <p>{ticket.description}</p>
          </Typography>
        </Grid>
      </React.Fragment>
    );
  } else {
    return <p>loading...</p>;
  }
}

export default TicketBody;
