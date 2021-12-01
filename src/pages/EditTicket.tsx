import {Box, Grid, Modal, Typography} from "@mui/material";
import EditTicketForm from "../components/EditTicketForm";
import {SxProps} from "@mui/system";
import {TicketInterface} from '../domainObjects/Ticket';

export default function EditTicket(props: {
    onClose: Function;
    ticket: TicketInterface | undefined;
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
        <div>
            <Modal open={true}>
                <Box sx={boxStyle}>
                    <Grid
                        container
                        spacing={{md: 0}}
                        columns={{xs: 4, sm: 8, md: 12}}
                        padding={{md: 0.6}}
                        justifyContent={"space-between"}
                    >
                        {props.ticket !== undefined ? (
                            <Typography variant="h4">Edit Ticket Number {"#" + props.ticket.id} </Typography>
                        ) : ("")}
                        <EditTicketForm onClose={props.onClose} ticket={props.ticket}/>
                    </Grid>
                </Box>
            </Modal>
        </div>
    )
}