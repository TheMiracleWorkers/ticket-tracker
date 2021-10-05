import "./App.css";
import Button from "@mui/material/Button";
import Box from '@mui/material/Box';


import TransportLayerTest from "./components/TransportLayerTest";
import AddTicketForm from "./components/AddTicketForm";
import SideMenu from "./components/SideMenu";
import TopHeader from "./components/TopHeader";
import {Grid} from "@mui/material";

import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Tickets from "./components/Tickets";
import Users from "./components/Users";
import Settings from "./components/Settings";

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

// function App() {
//   return (
//     <StoreProvider>
//       <div className="App">
//         <h3> Website goes here. </h3>
//         <Button variant="contained">MUI example</Button>
//       </div>
//     </StoreProvider>
//   );
// }

// function App() {
//   return (
//     <div className="App">
//       <h3> Website goes here. </h3>
//       <Button variant="contained">MUI example</Button>
//     </div>
//   );
// }


function App() {
    return (
        <Grid container>
            <Router>

                <SideMenu></SideMenu>
                <TopHeader></TopHeader>

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
                    </Switch>
                </div>
            </Router>
        </Grid>
    );
}

export default App;
