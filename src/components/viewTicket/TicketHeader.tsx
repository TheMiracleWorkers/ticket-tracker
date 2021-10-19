import React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import CloseIcon from "@mui/icons-material/Close";
import { IconButton } from "@mui/material";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import {
  createTheme,
  responsiveFontSizes,
  ThemeProvider,
} from "@mui/material/styles";
import { TicketInterface } from "../../domainObjects/Ticket";

function TicketHeader(props: {
  ticket: TicketInterface | undefined;
  onClose: Function;
}) {
  const ticket = props.ticket;
  let responsiveFontTheme = responsiveFontSizes(createTheme());

  if (ticket) {
    return (
      <React.Fragment>
        <Grid item xs={3} sm={6} md={10}>
          <ThemeProvider theme={responsiveFontTheme}>
            <Typography variant="h4" gutterBottom noWrap={true}>
              {"#" + ticket.id + " " + ticket.title}
            </Typography>
          </ThemeProvider>
        </Grid>
        <Grid
          item
          xs={"auto"}
          sm={"auto"}
          md={"auto"}
          container
          display={"inline"}
          alignContent={"center"}
        >
          <Grid item display={"inline"} justifyContent={"space-between"}>
            <IconButton>
              <EditOutlinedIcon fontSize={"large"} />
            </IconButton>
          </Grid>
          <Grid item display={"inline"} paddingLeft={{ xs: 1, sm: 2, md: 2 }}>
            <IconButton
              onClick={() => {
                props.onClose();
              }}
            >
              <CloseIcon fontSize={"large"} />{" "}
            </IconButton>
          </Grid>
        </Grid>

        <Grid item container spacing={1}>
          <Grid item>
            <Typography variant="body1" fontSize={"small"}>
              <strong>Assigned:</strong>
            </Typography>
          </Grid>
          <Grid item>
            <AccountCircleOutlinedIcon fontSize={"small"} />
          </Grid>
          <Grid item>
            <Typography variant="body1" fontSize={"small"}>
              Placeholder, Name
            </Typography>
          </Grid>
        </Grid>

        <Grid item container>
          <Grid item xs={4} sm={4} md={2}>
            <Typography variant="body1" fontSize={"small"}>
              <strong>Created:</strong> {ticket.createdDate?.toDateString()}
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant="body1" fontSize={"small"}>
              <strong>Due:</strong> {ticket.dueDate?.toDateString()}
            </Typography>
          </Grid>
        </Grid>

        <Grid item container>
          <Grid item xs={4} sm={2} md={2}>
            <Typography variant="body1" fontSize={"small"}>
              <strong>Status:</strong> Placeholder
            </Typography>
          </Grid>
          <Grid item xs={4} sm={2} md={2}>
            <Typography variant="body1" fontSize={"small"}>
              <strong>Severity:</strong> Placeholder
            </Typography>
          </Grid>
          <Grid item xs={4} sm={2} md={2}>
            <Typography variant="body1" fontSize={"small"}>
              <strong>Priority:</strong> Placeholder
            </Typography>
          </Grid>
        </Grid>
      </React.Fragment>
    );
  } else {
    return <React.Fragment>loading</React.Fragment>;
  }
}

export default TicketHeader;
