import "./App.css";
import SideMenu from "./components/SideMenu";
import TopHeader from "./components/TopHeader";
import Dashboard from "./pages/Dashboard";
import Tickets from "./components/Tickets";
import Users from "./components/Users";
import Settings from "./pages/Settings";
import Login from "./pages/Login";

import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import * as React from "react";

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

function App() {

    const [state, setState] = React.useState({
        logged_in: !!localStorage.getItem('token'),
        username: ''
    });

    // Log user out
    function handle_logout(): void {
        localStorage.removeItem('token');
        setState({logged_in: false, username: ''});
    }

    // Log user in
    function handle_login(data: any): void {
        fetch('http://localhost:8000/token-auth/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(json => {
                localStorage.setItem('token', json.token);
                setState({
                    logged_in: true,
                    username: json.user.username
                });
            });
    }

    return (
        <Router>
            <SideMenu/>
            <TopHeader handle_logout={handle_logout} logged_in={state.logged_in}/>

            <div id="content">
                <Switch>
                    <Route exact path="/">
                        <Dashboard/>
                    </Route>
                    <Route path="/tickets">
                        <Tickets/>
                    </Route>
                    <Route path="/users">
                        <Users/>
                    </Route>
                    <Route path="/settings">
                        <Settings/>
                    </Route>

                    <Route path="/login">
                        <Login handle_login={handle_login}/>
                    </Route>
                </Switch>
            </div>
        </Router>
    );
}

export default App;
