import { Box, Grid, Modal, Typography } from "@mui/material";
import EditTicketForm from "../components/EditTicketForm";
import { SxProps } from "@mui/system";
import Ticket, { TicketInterface } from '../domainObjects/Ticket';
import { AxiosResponse } from 'axios';
import { TransportLayer } from '../transportation/TransportLayer';
import { useEffect, useState } from 'react';

export default function EditTicket(props: {

    modalIsOpen: boolean;
    onClose: Function;
    ticketId: number | null;
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

    const transportLayer = new TransportLayer();
    const [ticketToUpdate, setTicketToUpdate] = useState<TicketInterface>();

    useEffect(() => {
         fetchOneTicket();       
    }, [props.modalIsOpen, props.ticketId]);

    function fetchOneTicket() {
        transportLayer
            .getTicketByIdPromise(props.ticketId as number)
            .then((response: AxiosResponse) => {
                const ticket: Ticket = new Ticket(response.data);
                setTicketToUpdate(ticket);
            })
            .catch((response: AxiosResponse) => {
                // Handle error.
                console.log(response);
            });
    }    
    return (
        <div>
            <Modal
                open={props.modalIsOpen}
            >
                <Box sx={boxStyle}>
                    <Grid
                        container
                        spacing={{ md: 0 }}
                        columns={{ xs: 4, sm: 8, md: 12 }}
                        padding={{ md: 0.6 }}
                        justifyContent={"space-between"}
                    >
                        <Typography variant="h4">Edit Ticket Number {"#" + props.ticketId} </Typography>
                        <EditTicketForm onClose={props.onClose} ticket={ticketToUpdate} />
                    </Grid>
                </Box>
            </Modal>            
        </div>
    )
}