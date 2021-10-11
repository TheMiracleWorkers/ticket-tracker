import React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

function TicketBody() {
  return (
    <React.Fragment>
      <Grid item xs={3} sm={6} md={10}>
        <Typography variant="body1">
          <strong>Description</strong>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </p>
        </Typography>
      </Grid>
    </React.Fragment>
  );
}

export default TicketBody;
