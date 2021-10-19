import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import TicketHeader from "./TicketHeader";
import { Divider, Modal } from "@mui/material";
import Box from "@mui/material/Box";
import TicketBody from "./TicketBody";
import Ticket, { TicketInterface } from "../../domainObjects/Ticket";
import { TransportLayer } from "../../transportation/TransportLayer";
import { AxiosResponse } from "axios";
import { SxProps } from "@mui/system";

const transportLayer = new TransportLayer();

const boxStyle: SxProps = {
  position: "relative",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "90%",
  height: "90%",
  bgcolor: "background.paper",
  border: "1px solid #000",
  boxShadow: 24,
  p: 4,
};

function ViewTicket(props: { ticketId: number }) {
  const [ticketState, setTicketState] = useState<TicketInterface>();
  const [modalOpen, setModalOpen] = useState(true);

  useEffect(() => {
    fetchOneTicket();
  }, []);

  function fetchOneTicket() {
    transportLayer
      .getTicketByIdPromise(props.ticketId)
      .then((response: AxiosResponse) => {
        const ticket: Ticket = new Ticket(response.data);
        setTicketState(ticket);
      })
      .catch((response: AxiosResponse) => {
        // Handle error.
        console.log(response);
      });
  }

  return (
    <Modal
      open={modalOpen}
      aria-labelledby="parent-modal-title"
      aria-describedby="parent-modal-description"
    >
      <Box sx={boxStyle}>
        <Grid
          container
          spacing={{ md: 0 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
          padding={{ md: 0.6 }}
          justifyContent={"space-between"}
        >
          <TicketHeader ticket={ticketState} />
          <Divider style={{ width: "100%", margin: 20 }} />
          <TicketBody ticket={ticketState} />
        </Grid>
      </Box>
    </Modal>
  );

  function handleOpen() {}
}

export default ViewTicket;
