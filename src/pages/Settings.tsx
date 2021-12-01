import * as React from 'react';
import {Grid, Typography} from "@mui/material";

export default function Settings() {
    return (
        <React.Fragment>
            <Typography variant="h1" gutterBottom>Settings</Typography>
            <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                    <Typography variant="body1">
                        Lorem ipsum dolor sit amet, consectetur adipiscing
                        elit. Integer consequat velit sem, ultrices cursus augue lacinia a. Quisque consequat ac neque
                        ut convallis. Sed velit arcu, vestibulum ut lacus vel, fermentum faucibus augue. Vivamus justo
                        felis, consectetur eu accumsan a, faucibus at diam.
                    </Typography>
                </Grid>
            </Grid>
        </React.Fragment>
    )
}