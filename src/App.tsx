import "./App.css";
import SideMenu from "./components/SideMenu";
import TopHeader from "./components/TopHeader";
import Dashboard from "./pages/Dashboard";
import Tickets from "./pages/Tickets";
import Users from "./pages/Users";
import Settings from "./pages/Settings";
import Login from "./pages/Login";
import AddTicket from "./pages/AddTicket";

import {Router, Switch, Route} from "react-router-dom";
import {createBrowserHistory} from 'history';
import * as React from "react";
import {Alert} from "@mui/material";

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
        show_message: false,
        message: '',
    });

    // Listen on router change
    history.listen((location) => {
        setMessage({show_message: false, message: ''})
    })

    // Log user out
    function handle_logout(): void {
        localStorage.removeItem('token');
        setUser({logged_in: false, username: ''});
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
                    setMessage({show_message: false, message: ''})
                    localStorage.setItem('token', json.token);
                    setUser({
                        logged_in: true,
                        username: json.user.username
                    });
                } else {
                    setMessage({show_message: true, message: 'Something went wrong while trying to login!'})
                }
            });
    }

    // Get current user data
    // function get_current_user(data: any): void {
    //     if (user.logged_in) {
    //         fetch(process.env.REACT_APP_REST_API + 'current-user', {
    //             headers: {
    //                 Authorization: `JWT ${localStorage.getItem('token')}`
    //             }
    //         })
    //             .then(res => res.json())
    //             .then(json => {
    //                 console.log(json.username)
    //             });
    //     }
    // }

    return (
        <Router history={history}>
            <SideMenu/>
            <TopHeader handle_logout={handle_logout} logged_in={user.logged_in} searchText={searchText}
                       setSearchText={setSearchText}/>

            <div id="content">

                {message.show_message ? (
                    <Alert onClose={() => {
                        setMessage({show_message: false, message: ''})
                    }} className="message" severity='error'>{message.message}</Alert>
                ) : ("")}

                <Switch>

                    {!user.logged_in ? (
                        <Route exact path="/">
                            <Login handle_login={handle_login}/>
                        </Route>
                    ) : (
                        <Route exact path="/">
                            <Dashboard/>
                        </Route>
                    )}

                    <Route path="/tickets">
                        <Tickets searchTextInput={searchText}/>
                    </Route>
                    <Route path="/users">
                        <Users searchTextInput={searchText}/>
                    </Route>
                    <Route path="/settings">
                        <Settings/>
                    </Route>
                    <Route path="/add-ticket">
                        <AddTicket/>
                    </Route>

                </Switch>
            </div>
        </Router>
    );
}

export default App;
