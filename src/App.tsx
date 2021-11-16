import "./App.css";
import SideMenu from "./components/SideMenu";
import TopHeader from "./components/TopHeader";
import Dashboard from "./pages/Dashboard";
import Tickets from "./pages/Tickets";
import Users from "./pages/Users";
import Settings from "./pages/Settings";
import Login from "./pages/Login";
import Register from "./pages/Register";

import {Router, Switch, Route} from "react-router-dom";
import {createBrowserHistory} from 'history';
import * as React from "react";
import {Alert} from "@mui/material";
import PrivateRoute from "./components/PrivateRoute";

// const StoreContext = React.createContext(new RootStore());

// const StoreProvider: React.FC = ({ children }) => {
//   const store = useContext(StoreContext);
//   return (
//     <StoreContext.Provider value={store}> {children} </StoreContext.Provider>
//   );
// };

// const Example = observer(() => {
//   const rootStore = useContext(StoreContext);
//   var interval = setInterval(
//     () => rootStore.ticketStore.ticketArray[0].id++,
//     1000
//   );

//   return <p>{rootStore.ticketStore.ticketArray[0].id}</p>;
// });

const history = createBrowserHistory();

function App() {

    const [searchText, setSearchText] = React.useState("");
    const [user, setUser] = React.useState({
        logged_in: !!localStorage.getItem('token'),
        username: '',
    });

    const [message, setMessage] = React.useState({
        status: '',
        show_message: false,
        message: '',
    });

    // Log user out
    function handle_logout(): void {
        localStorage.removeItem('token');
        setUser({logged_in: false, username: ''});
        // window.location.reload();
    }

    // Log user in
    function handle_login(data: any): void {
        fetch(process.env.REACT_APP_REST_API + 'token-auth/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(json => {
                if (json.user !== undefined) {
                    setMessage({status: '', show_message: false, message: ''})
                    localStorage.setItem('token', json.token);
                    setUser({
                        logged_in: true,
                        username: json.user.username
                    });
                } else {
                    setMessage({status: 'error', show_message: true, message: 'Something went wrong while trying to login!'})
                }
            });
    }

    // Register user
    function handle_register(data: any): void {
        fetch(process.env.REACT_APP_REST_API + 'register/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(json => {
                if (json.token !== undefined) {
                    setMessage({status: 'success', show_message: true, message: 'Successfully registered account! Please login'})
                } else {
                    setMessage({status: 'error', show_message: true, message: 'Something went wrong while trying to register user!'})
                }
            });
    }

    // Refresh token
    setInterval(function () {
        fetch(process.env.REACT_APP_REST_API + 'token-refresh/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: "Token: " + localStorage.getItem('token')
        })
            .then(res => res.json())
            .then(json => {
                if (json.user !== undefined) {
                    localStorage.setItem('token', json.token);
                    setUser({
                        logged_in: true,
                        username: json.user.username
                    });
                }
            });
    },275000);

    // Change variables on route change
    history.listen((location) => {
        setMessage({status: '', show_message: false, message: ''});
        setSearchText("");
    })

    return (
        <Router history={history}>
            <SideMenu/>
            <TopHeader handle_logout={handle_logout} logged_in={user.logged_in} searchText={searchText}
                       setSearchText={setSearchText}/>

            <div id="content">

                {message.show_message && message.status === "error" ? (
                    <Alert onClose={() => {
                        setMessage({status: '', show_message: false, message: ''})
                    }} className="message" severity="error">{message.message}</Alert>
                ) : ("")}

                {message.show_message && message.status === "success" ? (
                    <Alert onClose={() => {
                        setMessage({status: '', show_message: false, message: ''})
                    }} className="message" severity="success">{message.message}</Alert>
                ) : ("")}

                <Switch>

                    {!user.logged_in ? (
                        <Route exact path="/">
                            <Login handle_login={handle_login}/>
                        </Route>
                    ) : (
                        ""
                    )}
                    {!user.logged_in ? (
                        <Route path="/register">
                            <Register handle_register={handle_register}/>
                        </Route>
                    ) : (
                        <Route exact path="/">
                            <Dashboard/>
                        </Route>
                    )}

                    <PrivateRoute path="/tickets" component={<Tickets searchTextInput={searchText}/>}
                                  isLoggedIn={user.logged_in}/>
                    <PrivateRoute path="/users" component={<Users searchTextInput={searchText}/>}
                                  isLoggedIn={user.logged_in}/>
                    <PrivateRoute path="/settings" component={<Settings/>} isLoggedIn={user.logged_in}/>

                </Switch>
            </div>
        </Router>
    );
}

export default App;
