import React, { useContext } from "react";
import "./App.css";
import Button from "@mui/material/Button";
import { TicketStore } from "./stores/TicketStore";
import { observer, useLocalStore } from "mobx-react";

const StoreContext = React.createContext(new TicketStore());

const StoreProvider: React.FC = ({ children }) => {
  const store = useContext(StoreContext);
  return (
    <StoreContext.Provider value={store}> {children} </StoreContext.Provider>
  );
};

// const Example = observer(() => {
//   const ticketStore = useContext(StoreContext);
//   var interval = setInterval(() => ticketStore.ticketArray[0].id++, 1000);

//   return <p>{ticketStore.ticketArray[0].id}</p>;
// });

function App() {
  return (
    <StoreProvider>
      <div className="App">
        <h3> Website goes here. </h3>
        <Button variant="contained">MUI example</Button>
      </div>
    </StoreProvider>
  );
}

export default App;
