import "./App.css";
import SideMenu from "./components/SideMenu";
import TopHeader from "./components/TopHeader";
import Dashboard from "./pages/Dashboard";
import Tickets from "./pages/Tickets";
import Users from "./pages/Users";
import Settings from "./pages/Settings";
import Login from "./pages/Login";
import Register from "./pages/Register";

import { Redirect, Route, Router, Switch } from "react-router-dom";
import { createBrowserHistory } from "history";
import * as React from "react";
import { Alert } from "@mui/material";
import PrivateRoute from "./components/PrivateRoute";
import Projects from "./pages/Projects";
import inMemoryJWT from "./domainObjects/inMemoryJWTManager";

const history = createBrowserHistory();
let refreshInterval: NodeJS.Timeout;

function App() {
  const [searchText, setSearchText] = React.useState("");
  const [user, setUser] = React.useState({
    logged_in: false,
    username: "",
  });

  const [message, setMessage] = React.useState({
    status: "",
    show_message: false,
    message: "",
  });

  // Log user out
  function handle_logout(): void {
    inMemoryJWT.deleteToken();
    setUser({ logged_in: false, username: "" });
    clearInterval(refreshInterval);
  }

  // Log user in
  function handle_login(data: any): void {
    fetch(process.env.REACT_APP_REST_API + "token-auth/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((json) => {
        if (json.user !== undefined) {
          setMessage({ status: "", show_message: false, message: "" });
          inMemoryJWT.setToken(json.token);
          setUser({
            logged_in: true,
            username: json.user.username,
          });
          // Refresh token
          startInterval();
        } else {
          if (json.non_field_errors !== undefined) {
            setMessage({
              status: "error",
              show_message: true,
              message: json.non_field_errors,
            });
          } else {
            setMessage({
              status: "error",
              show_message: true,
              message: "Something went wrong while trying to login!",
            });
          }
        }
      })
      .catch((err) => {
        setMessage({
          status: "error",
          show_message: true,
          message: "Something went wrong while trying to login!",
        });
      });
  }

  // Register user
  function handle_register(data: any): void {
    fetch(process.env.REACT_APP_REST_API + "register/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => {
        if (!res.ok) throw res;
        else return res.json();
      })
      .then(() => {
        setMessage({
          status: "success",
          show_message: true,
          message: "Successfully registered account! Please login",
        });
      })
      .catch(async (error) => {
        let json = await error.json();
        let message = "Something went wrong while trying to register user!";
        if (json.non_field_errors !== undefined) {
          message = json.non_field_errors;
        } else if (json.username !== undefined) {
          message = "Username: " + json.username;
        } else if (json.email !== undefined) {
          message = "Email: " + json.email;
        } else if (json.password !== undefined) {
          message = "Password: " + json.password;
        }
        setMessage({ status: "error", show_message: true, message: message });
      });
  }

  // Refresh token
  function startInterval(): void {
    refreshInterval = setInterval(function () {
      refresh_token();
    }, 500000);
  }

  // Refresh JWT token
  function refresh_token(): void {
    fetch(process.env.REACT_APP_REST_API + "token-refresh/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token: inMemoryJWT.getToken() }),
    })
      .then((res) => res.json())
      .then((json) => {
        if (json.user !== undefined) {
          inMemoryJWT.setToken(json.token);
          setUser({
            logged_in: true,
            username: json.user.username,
          });
        } else {
          handle_logout();
        }
      })
      .catch((err) => {
        handle_logout();
      });
  }

  // Change variables on route change
  history.listen((location) => {
    setMessage({ status: "", show_message: false, message: "" });
    setSearchText("");
  });

  // Start interval on page load
  window.addEventListener("load", () => {
    if (user.logged_in) {
      refresh_token();
      startInterval();
    }
  });

  return (
    <Router history={history}>
      <SideMenu />
      <TopHeader
        handle_logout={handle_logout}
        logged_in={user.logged_in}
        searchText={searchText}
        setSearchText={setSearchText}
      />

      <div id="content">
        {message.show_message && message.status === "error" ? (
          <Alert
            onClose={() => {
              setMessage({ status: "", show_message: false, message: "" });
            }}
            className="message"
            severity="error"
          >
            {message.message}
          </Alert>
        ) : (
          ""
        )}

        {message.show_message && message.status === "success" ? (
          <Alert
            onClose={() => {
              setMessage({ status: "", show_message: false, message: "" });
            }}
            className="message"
            severity="success"
          >
            {message.message}
          </Alert>
        ) : (
          ""
        )}

        <Switch>
          <Redirect from="/ticket-tracker" to="/" />

          {!user.logged_in ? (
            <Route exact path="/">
              <Login handle_login={handle_login} />
            </Route>
          ) : (
            ""
          )}
          {!user.logged_in ? (
            <Route path="/register">
              <Register setMessage={setMessage} />
            </Route>
          ) : (
            <Route exact path="/">
              <Dashboard />
            </Route>
          )}

          <PrivateRoute
            path="/tickets"
            component={<Tickets searchTextInput={searchText} />}
            isLoggedIn={user.logged_in}
          />
          <PrivateRoute
            path="/users"
            component={<Users searchTextInput={searchText} />}
            isLoggedIn={user.logged_in}
          />
          <PrivateRoute
            path="/settings"
            component={<Settings />}
            isLoggedIn={user.logged_in}
          />
          <PrivateRoute
            path="/projects"
            component={<Projects />}
            isLoggedIn={user.logged_in}
          />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
