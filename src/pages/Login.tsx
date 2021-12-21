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
import inMemoryJWT from "../domainObjects/inMemoryJWTManager";
import {LoadingButton} from "@mui/lab";

interface State {
  showPassword: boolean;
  username: string;
  password: string;
}

const transportLayer = new TransportLayer();

export default function Login(props: {
  setMessage: Function;
  setUser: Function;
  startInterval: Function;
}) {

  const [loading, setLoading] = React.useState(false)
  const [values, setValues] = React.useState<State>({
    showPassword: false,
    username: "",
    password: "",
  });

  // Toggle password visibility
  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  // Log user in
  const handleLogin = (loginUser: UserRegistration) => {
    setLoading(true)
    transportLayer
      .loginUserPromise(loginUser)
      .then((response: any) => {
        if (response.data.user !== undefined) {
          props.setMessage({ status: "", show_message: false, message: "" });
          inMemoryJWT.setToken(response.data.token);
          props.setUser({
            logged_in: true,
            username: response.data.user.username,
          });
        } else {
          props.setMessage({
            status: "error",
            show_message: true,
            message: "Something went wrong while trying to login!",
          });
        }
        setLoading(false)
      })
      .catch((err) => {
        setLoading(false)
        props.setMessage({
          status: "error",
          show_message: true,
          message: "Something went wrong while trying to login!",
        });
      });
  };

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    onSubmit: (values) => {
      const loginUser = new UserRegistration(
        values.username,
        "",
        values.password
      );

      handleLogin(loginUser);
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
            <LoadingButton loading={loading} variant="outlined" type="submit" fullWidth>
              Login
            </LoadingButton>
          </Grid>

          <Grid item xs={12} sm={9}>
            <Button component={Link} to="/register">
              Don't have an account yet?
            </Button>
          </Grid>
        </Grid>
      </form>
    </React.Fragment>
  );
}
