import * as React from 'react';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { useFormik } from "formik";
import Button from "@mui/material/Button";
import { MenuItem, Stack } from "@mui/material";
import User, { UserInterface } from '../domainObjects/User';
import { TransportUsers } from '../transportation/TransportUsers';

export default function EditUserForm(props: {
    onClose: Function;
    user: UserInterface | undefined
}) {
    const transportLayer = new TransportUsers();
    const user = props.user;
    
    const formik = useFormik({
        initialValues: {
            username: user?.username,
            email: user?.email,
            groups: user?.groups,
            last_login: user?.last_login,
            date_joined: user?.date_joined,
        },
        onSubmit: (values) => {
            const updateUser = new User({
                'id': user?.id,
                'username': values.username,
                'email': values.email,
                'groups': values.groups,
                'last_login': user?.last_login,
                'date_joined': user?.date_joined,
            });

            transportLayer.updateUserPromise(updateUser)
                .then(res => {                 
                    props.onClose();
                    window.location.reload();
                }).catch(err => {
                    // TODO: Show error
                });
        },
    });

    return (
        <React.Fragment>
            
            <form style={{width: "100%"}} onSubmit={formik.handleSubmit}>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={4}>
                        <TextField
                            required
                            id="username"
                            name="username"
                            label="Username"
                            fullWidth
                            variant="standard"
                            value={formik.values.username}
                        />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <TextField
                            required
                            id="email"
                            name="email"
                            label="Email"
                            fullWidth
                            variant="standard"
                            value={formik.values.email}
                        />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <TextField
                            select
                            id="groups"
                            name="groups"
                            label="Roles"
                            fullWidth
                            variant="standard"
                            value={formik.values.groups}
                        >
                            <MenuItem key="TBD" value="TBD">
                                TBD
                            </MenuItem>
                        </TextField>
                    </Grid>

                    <Grid item xs={12}>
                        <Stack spacing={2} direction="row">
                            <Button color="primary" variant="contained" type="submit">
                                Submit
                            </Button>
                            <Button color="primary" variant="outlined" onClick={() => props.onClose()}>
                                Cancel
                            </Button>
                        </Stack>
                    </Grid>
                </Grid>
            </form>

        </React.Fragment>
    );
}