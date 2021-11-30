import * as React from 'react';
import {useEffect, useState} from 'react';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import {useFormik} from "formik";
import Button from "@mui/material/Button";
import {Box, Chip, MenuItem, Select, Stack} from "@mui/material";
import User, {UserInterface} from '../domainObjects/User';
import {TransportUsers} from '../transportation/TransportUsers';
import Role from '../domainObjects/Role';
import {TransportLayerRoles} from '../transportation/TransportLayerRoles';


export default function EditUserForm(props: {
    onClose: Function;
    user: UserInterface | undefined
}) {
    const transportLayer = new TransportUsers();
    const user = props.user;
    const [roles, setRoles] = useState<Role[]>([]);
    const transportRole = new TransportLayerRoles();
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
                }).catch(err => {
                // TODO: Show error
            });
        },
    });

    function getAllRoles() {
        transportRole
            .getAllRolesPromise()
            .then((response: any) => {
                const allRoles: Role[] = response.data.map(
                    (responseElement: any) => new Role(responseElement)
                );
                setRoles(allRoles);
            })
    }

    useEffect(() => {
        getAllRoles();
    }, []);


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
                            onChange={formik.handleChange}
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
                            onChange={formik.handleChange}
                        />
                    </Grid>

                    <Grid item xs={12} sm={4}>
                        <Select
                            id="groups"
                            name="groups"
                            label="Roles"
                            fullWidth
                            multiple
                            variant="standard"
                            value={(formik.values.groups)}
                            onChange={formik.handleChange}
                            renderValue={(selected) => {
                                return (
                                    <Box sx={{display: 'flex', flexWrap: 'wrap', gap: 0.5}}>
                                        {selected.map((value) => {
                                            const option = roles.find((o) => o.url === value);
                                            return <Chip key={value} label={option?.name}/>;
                                        })}
                                    </Box>
                                );
                            }}
                        >
                            {roles.map((role) => (
                                <MenuItem
                                    key={role.url}
                                    value={role.url}
                                >
                                    {role.name}
                                </MenuItem>
                            ))}
                        </Select>
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