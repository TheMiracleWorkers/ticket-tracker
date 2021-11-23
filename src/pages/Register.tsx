import * as React from 'react';

import {Visibility, VisibilityOff} from '@mui/icons-material';
import {FormControl, InputAdornment, InputLabel, IconButton, Input, Button, Grid, Typography} from '@mui/material';
import {Link} from "react-router-dom";
import PropTypes from 'prop-types';
import {useFormik} from "formik";

interface State {
    showPassword: boolean;
    username: string;
    email: string;
    password: string;
}

export default function Register(props: { handle_register: (arg0: State) => void; }) {
    const [values, setValues] = React.useState<State>({
        showPassword: false,
        username: '',
        email: '',
        password: '',
    });

    // Toggle password visibility
    const handleClickShowPassword = () => {
        setValues({
            ...values,
            showPassword: !values.showPassword,
        });
    };

    const formik = useFormik({
        initialValues: {
            username: '',
            email: '',
            password: '',
        },
        onSubmit: (values) => {
            const registerUser = {
                'showPassword': false,
                'username': values.username,
                'email': values.email,
                'password': values.password,
            }
            props.handle_register(registerUser)
        },
    });

    return (
        <React.Fragment>

            <form onSubmit={formik.handleSubmit}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Typography variant="h1">Register</Typography>
                    </Grid>

                    <Grid item xs={12}>
                        <FormControl variant="standard" fullWidth>
                            <InputLabel htmlFor="username">Username</InputLabel>
                            <Input
                                required
                                id="username"
                                value={formik.values.username}
                                onChange={formik.handleChange}
                            />
                        </FormControl>
                    </Grid>

                    <Grid item xs={12}>
                        <FormControl variant="standard" fullWidth>
                            <InputLabel htmlFor="email">Email</InputLabel>
                            <Input
                                required
                                id="email"
                                type="email"
                                value={formik.values.email}
                                onChange={formik.handleChange}
                            />
                        </FormControl>
                    </Grid>

                    <Grid item xs={12}>
                        <FormControl variant="standard" fullWidth>
                            <InputLabel htmlFor="password">Password</InputLabel>
                            <Input
                                required
                                id="password"
                                inputProps={{ minLength: 8 }}
                                type={values.showPassword ? 'text' : 'password'}
                                value={formik.values.password}
                                onChange={formik.handleChange}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton onClick={handleClickShowPassword}>
                                            {values.showPassword ? <VisibilityOff/> : <Visibility/>}
                                        </IconButton>
                                    </InputAdornment>
                                }
                            />
                        </FormControl>
                    </Grid>

                    <Grid item xs={3}>
                        <Button variant="outlined" type="submit" fullWidth>Register</Button>
                    </Grid>

                    <Grid item xs={3}>
                        <Button component={Link} to="/">Already have an account?</Button>
                    </Grid>
                </Grid>
            </form>
        </React.Fragment>
    )
}

// Add prop types
Register.propTypes = {
    handle_register: PropTypes.func.isRequired
};