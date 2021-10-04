import React, { useContext } from "react";
import "./App.css";
import Button from "@mui/material/Button";
import { TicketStore } from "./stores/TicketStore";
import { observer, useLocalStore } from "mobx-react";
import { RootStore } from "./stores/RootStore";
import AddTicketForm from "./components/AddTicketForm";


const StoreContext = React.createContext(new RootStore());

const StoreProvider: React.FC = ({ children }) => {
  const store = useContext(StoreContext);
  return (
    <StoreContext.Provider value={store}> {children} </StoreContext.Provider>
  );
};

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

function App() {
  return (
    <div className="App">

        <AddTicketForm></AddTicketForm>
    </div>

  );
}

export default App;
