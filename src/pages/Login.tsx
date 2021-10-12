import * as React from 'react';

import {Visibility, VisibilityOff} from '@mui/icons-material';
import {FormControl, InputAdornment, InputLabel, IconButton, Input, Button, Grid, Typography} from '@mui/material';

interface State {
    showPassword: boolean;
    username: string;
    password: string;
}

export default function Login() {
    const [values, setValues] = React.useState<State>({
        showPassword: false,
        username: '',
        password: '',
    });

    const handleChange =
        (prop: keyof State) => (event: React.ChangeEvent<HTMLInputElement>) => {
            setValues({...values, [prop]: event.target.value});
        };

    const handleClickShowPassword = () => {
        setValues({
            ...values,
            showPassword: !values.showPassword,
        });
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

            <Grid item xs={6}>
                <Button type={"submit"} variant="outlined" fullWidth>Login</Button>
            </Grid>
        </Grid>
    )
}