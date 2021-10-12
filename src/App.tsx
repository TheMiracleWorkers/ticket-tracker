import "./App.css";
import SideMenu from "./components/SideMenu";
import TopHeader from "./components/TopHeader";
import Dashboard from "./pages/Dashboard";
import Tickets from "./components/Tickets";
import Users from "./components/Users";
import Settings from "./pages/Settings";
import Login from "./pages/Login";

import {BrowserRouter as Router, Switch, Route} from "react-router-dom";

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
    return (
        <Router>

            <SideMenu/>
            <TopHeader/>

            <div id="content" className="App">
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
                        <Login/>
                    </Route>
                </Switch>
            </div>
        </Router>
    );
}

export default App;
