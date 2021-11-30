import * as React from 'react';

import {Visibility, VisibilityOff} from '@mui/icons-material';
import {Button, FormControl, Grid, IconButton, Input, InputAdornment, InputLabel, Typography} from '@mui/material';
import {Link} from "react-router-dom";
import PropTypes from 'prop-types';
import {useFormik} from "formik";

interface State {
    showPassword: boolean;
    username: string;
    password: string;
}

export default function Login(props: { handle_login: (arg0: State) => void; }) {
    const [values, setValues] = React.useState<State>({
        showPassword: false,
        username: '',
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
            password: '',
        },
        onSubmit: (values) => {
            const loginUser = {
                'showPassword': false,
                'username': values.username,
                'password': values.password,
            }
            props.handle_login(loginUser)
        },
    });

    return (
        <React.Fragment>

            <form onSubmit={formik.handleSubmit}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Typography variant="h1">Login</Typography>
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
                            <InputLabel htmlFor="password">Password</InputLabel>
                            <Input
                                required
                                id="password"
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
                        <Button variant="outlined" type="submit" fullWidth>Login</Button>
                    </Grid>

                    <Grid item xs={3}>
                        <Button component={Link} to="/register">Don't have an account yet?</Button>
                    </Grid>
                </Grid>
            </form>
        </React.Fragment>
    )
}

// Add prop types
Login.propTypes = {
    handle_login: PropTypes.func.isRequired
};