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

const ViewTicket = () => {
  let responsiveFontTheme = createTheme();
  responsiveFontTheme = responsiveFontSizes(responsiveFontTheme);

  return (
    <React.Fragment>
      <Grid
        container
        spacing={{ md: 0 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
        padding={{ md: 0.6 }}
        justifyContent={"space-between"}
      >
        <Grid item xs={3} sm={6} md={10}>
          <ThemeProvider theme={responsiveFontTheme}>
            <Typography variant="h4" gutterBottom noWrap={true}>
              #00005 Placeholder title
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
            <EditOutlinedIcon fontSize={"large"} />
          </Grid>
          <Grid item display={"inline"} paddingLeft={{ xs: 2, md: 4 }}>
            <CloseIcon fontSize={"large"} />
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
          <Grid item xs={4} sm={2} md={2}>
            <Typography variant="body1" fontSize={"small"}>
              <strong>Created:</strong> Placeholder
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant="body1" fontSize={"small"}>
              <strong>Due:</strong> Placeholder
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
      </Grid>
    </React.Fragment>
  );
};

export default ViewTicket;
