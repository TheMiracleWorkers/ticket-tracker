import React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import CloseIcon from "@mui/icons-material/Close";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import {
  createTheme,
  responsiveFontSizes,
  ThemeProvider,
} from "@mui/material/styles";
import { border } from "@mui/system";
import TicketHeader from "./TicketHeader";
import { Divider } from "@mui/material";
import TicketBody from "./TicketBody";
import Ticket from "../../domainObjects/Ticket";
import PropTypes from "prop-types";

function ViewTicket(ticket: Ticket) {
  return (
    <React.Fragment>
      <Grid
        container
        spacing={{ md: 0 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
        padding={{ md: 0.6 }}
        justifyContent={"space-between"}
      >
        <TicketHeader ticket={ticket} />
        <Divider style={{ width: "100%", margin: 20 }} />
        <TicketBody />
      </Grid>
    </React.Fragment>
  );
}

ViewTicket.propTypes = {
  ticket: PropTypes.instanceOf(Ticket),
};

export default ViewTicket;
