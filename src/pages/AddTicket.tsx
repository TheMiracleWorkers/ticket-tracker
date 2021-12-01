import * as React from 'react';
import {Box, Grid, Modal, Typography} from "@mui/material";
import AddTicketForm from "../components/AddTicketForm";
import {SxProps} from "@mui/system";

export default function AddTickets(props: {
    modalIsOpen: boolean;
    onClose: Function;
}) {

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
    };

    return (
        <div id="add-ticket">
            <Modal
                open={props.modalIsOpen}
            >
                <Box sx={boxStyle}>
                    <Grid
                        container
                        spacing={{md: 0}}
                        columns={{xs: 4, sm: 8, md: 12}}
                        padding={{md: 0.6}}
                        justifyContent={"space-between"}
                    >
                        <Typography variant="h4" gutterBottom noWrap={true}>Add Ticket</Typography>
                        <Grid item xs={4} sm={8} md={12}>
                            <AddTicketForm onClose={props.onClose}/>
                        </Grid>
                    </Grid>
                </Box>
            </Modal>
        </div>
    )
}