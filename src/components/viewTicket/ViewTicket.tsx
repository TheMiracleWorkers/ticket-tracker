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
  width: "85%",
  height: "85%",
  bgcolor: "background.paper",
  border: "1px solid #000",
  boxShadow: 24,
  p: 4,
  overflow:'auto'
};

function ViewTicket(props: {
  ticketId: number | null;
  modalIsOpen: boolean;
  onClose: Function;
  onEdit: Function;
}) {
  const [ticketState, setTicketState] = useState<TicketInterface>();

  useEffect(() => {
    if (props.modalIsOpen) {
      setTicketState(undefined);
      fetchOneTicket();
    } else {
    }
  }, [props.modalIsOpen]);

  function fetchOneTicket() {
    transportLayer
      .getTicketByIdPromise(props.ticketId as number)
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
      open={props.modalIsOpen}
      aria-labelledby="parent-modal-title"
      aria-describedby="parent-modal-description"
      onBackdropClick={() => {
        props.onClose();
      }}
    >
      <Box sx={boxStyle}>
        <Grid
          container
          spacing={{ md: 0 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
          padding={{ md: 0.6 }}
          justifyContent={"space-between"}
        >
          <TicketHeader ticket={ticketState} onClose={props.onClose} onEdit={props.onEdit} /> 
          <Divider style={{ width: "100%", margin: 20 }} />
          <TicketBody ticket={ticketState} />
        </Grid>
      </Box>
    </Modal>
  );

  function handleOpen() {}
}

export default ViewTicket;
