import * as React from 'react';
import {Typography} from "@mui/material";
import AddTicketForm from "../components/AddTicketForm";

export default function Settings() {
    return(
        <div id="add-ticket">
            <Typography variant="h1">Add Ticket</Typography>
            <AddTicketForm/>
        </div>
    )
}