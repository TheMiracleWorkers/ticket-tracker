import * as React from "react";

import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Button,
  FormControl,
  Grid,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import UserRegistration from "../domainObjects/UserRegistration";
import { TransportLayer } from "../transportation/TransportLayer";
import { AxiosError } from "axios";

interface State {
  showPassword: boolean;
  username: string;
  email: string;
  password: string;
}

export default function Register(props: { setMessage: Function }) {
  const [values, setValues] = React.useState<State>({
    showPassword: false,
    username: "",
    email: "",
    password: "",
  });

  const transportLayer = new TransportLayer();

  // Toggle password visibility
  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  // Handle user registration.
  const handleRegister = (userRegistration: UserRegistration) => {
    transportLayer
      .registerUserPromise(userRegistration)
      .then((response) => {
        props.setMessage({
          status: "success",
          show_message: true,
          message: "Successfully registered account! Please login",
        });
      })
      .catch((error: AxiosError) => {
        //Request made an server response.
        if (error.response) {
          console.log(error.response.status);
          console.log(error.response.headers);
          console.log(error.response.data);
        }
      });
  };

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
    },
    onSubmit: (values) => {
      const userRegistration = new UserRegistration(
        values.username,
        values.email,
        values.password
      );
      handleRegister(userRegistration);
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
                type={values.showPassword ? "text" : "password"}
                value={formik.values.password}
                onChange={formik.handleChange}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton onClick={handleClickShowPassword}>
                      {values.showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={3}>
            <Button variant="outlined" type="submit" fullWidth>
              Register
            </Button>
          </Grid>

          <Grid item xs={12} sm={9}>
            <Button component={Link} to="/">
              Already have an account?
            </Button>
          </Grid>
        </Grid>
      </form>
    </React.Fragment>
  );
}
