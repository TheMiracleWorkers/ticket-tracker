import * as React from 'react';

import {Visibility, VisibilityOff} from '@mui/icons-material';
import {FormControl, InputAdornment, InputLabel, IconButton, Input, Button, Grid} from '@mui/material';

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
        <Grid container>
            <FormControl variant="standard" component={Grid} item xs={12}>
                <InputLabel htmlFor="username">Username</InputLabel>
                <Input
                    id="username"
                    value={values.username}
                    onChange={handleChange('username')}
                />
            </FormControl>

            <FormControl variant="standard" component={Grid} item xs={12}>
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

            <Grid item xs={12}>
                <Button type={"submit"} variant="outlined">Login</Button>
            </Grid>

        </Grid>
    )
}