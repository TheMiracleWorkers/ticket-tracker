import * as React from 'react';

import {Visibility, VisibilityOff} from '@mui/icons-material';
import {FormControl, InputAdornment, InputLabel, IconButton, Input, Button, Grid, Typography} from '@mui/material';

import PropTypes from 'prop-types';

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
            props.handle_login(values);
        }
    };

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Typography variant="h1">Login</Typography>
            </Grid>

            <Grid item xs={12}>
                <FormControl variant="standard" fullWidth>
                    <InputLabel htmlFor="username">Username</InputLabel>
                    <Input
                        id="username"
                        value={values.username}
                        onChange={handleChange('username')}
                        onKeyPress={handleKeypress}
                    />
                </FormControl>
            </Grid>

            <Grid item xs={12}>
                <FormControl variant="standard" fullWidth>
                    <InputLabel htmlFor="password">Password</InputLabel>
                    <Input
                        id="password"
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
                <Button type="submit" onClick={e => props.handle_login(values)} variant="outlined"
                        fullWidth>Login</Button>
            </Grid>
        </Grid>
    )
}

// Add prop types
Login.propTypes = {
    handle_login: PropTypes.func.isRequired
};