import * as React from 'react';
import { Box, Grid, Modal, Typography } from "@mui/material";
import EditUserForm from "../components/EditUserForm";
import { SxProps } from "@mui/system";
import { UserInterface } from '../domainObjects/User';

export default function EditUser(props: {
    modalIsOpen: boolean;
    onClose: Function;
    user: UserInterface | undefined;
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
            <Modal open={props.modalIsOpen}>
                <Box sx={boxStyle}>
                    <Grid
                        container
                        spacing={{ md: 0 }}
                        columns={{ xs: 4, sm: 8, md: 12 }}
                        padding={{ md: 0.6 }}
                        justifyContent={"space-between"}
                    >
                        <Typography variant="h4">Edit User</Typography>
                        <EditUserForm onClose={props.onClose} user={props.user} />
                    </Grid>
                </Box>
            </Modal>
            
        </div>
    )
}