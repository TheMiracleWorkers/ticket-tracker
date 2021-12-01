import React from "react";
import Grid from "@mui/material/Grid";
import TicketHeader from "./TicketHeader";
import {Divider, Modal} from "@mui/material";
import Box from "@mui/material/Box";
import TicketBody from "./TicketBody";
import {TicketInterface} from "../../domainObjects/Ticket";
import {SxProps} from "@mui/system";

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
    overflow: 'auto'
};

function ViewTicket(props: {
    ticket: TicketInterface | undefined;
    modalIsOpen: boolean;
    onClose: Function;
    onEdit: Function;
}) {

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
                    spacing={{md: 0}}
                    columns={{xs: 4, sm: 8, md: 12}}
                    padding={{md: 0.6}}
                    justifyContent={"space-between"}
                >
                    <TicketHeader ticket={props.ticket} onClose={props.onClose} onEdit={props.onEdit}/>
                    <Divider style={{width: "100%", margin: 20}}/>
                    <TicketBody ticket={props.ticket}/>
                </Grid>
            </Box>
        </Modal>
    );

}

export default ViewTicket;
