import * as React from 'react';

import {Visibility, VisibilityOff} from '@mui/icons-material';
import {FormControl, InputAdornment, InputLabel, IconButton, Input, Button, Grid, Typography} from '@mui/material';
import {Link} from "react-router-dom";
import PropTypes from 'prop-types';

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

    const handleChange =
        (prop: keyof State) => (event: React.ChangeEvent<HTMLInputElement>) => {
            setValues({...values, [prop]: event.target.value});
        };

    // Toggle password visibility
    const handleClickShowPassword = () => {
        setValues({
            ...values,
            showPassword: !values.showPassword,
        });
    };

    // Check for enter presses
    const handleKeypress = (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (e.key === 'Enter') {
            props.handle_register(values);
        }
    };

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Typography variant="h1">Register</Typography>
            </Grid>

            <Grid item xs={12}>
                <FormControl variant="standard" fullWidth>
                    <InputLabel htmlFor="r_username">Username</InputLabel>
                    <Input
                        id="r_username"
                        value={values.username}
                        onChange={handleChange('username')}
                        onKeyPress={handleKeypress}
                    />
                </FormControl>
            </Grid>

            <Grid item xs={12}>
                <FormControl variant="standard" fullWidth>
                    <InputLabel htmlFor="r_email">Email</InputLabel>
                    <Input
                        id="r_email"
                        value={values.email}
                        onChange={handleChange('email')}
                        onKeyPress={handleKeypress}
                    />
                </FormControl>
            </Grid>

            <Grid item xs={12}>
                <FormControl variant="standard" fullWidth>
                    <InputLabel htmlFor="r_password">Password</InputLabel>
                    <Input
                        id="r_password"
                        type={values.showPassword ? 'text' : 'password'}
                        value={values.password}
                        onChange={handleChange('password')}
                        onKeyPress={e => handleKeypress(e)}
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
                <Button type="submit" onClick={e => props.handle_register(values)} variant="outlined"
                        fullWidth>Register</Button>
            </Grid>

            <Grid item xs={3}>
                <Button component={Link} to="/">Already have an account?</Button>
            </Grid>
        </Grid>
    )
}

// Add prop types
Register.propTypes = {
    handle_register: PropTypes.func.isRequired
};