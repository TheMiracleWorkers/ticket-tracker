import "./App.css";
import Button from "@mui/material/Button";

import TransportLayerTest from "./components/TransportLayerTest";
import AddTicketForm from "./components/AddTicketForm";
import ViewTicket from "./components/viewTicket/ViewTicket";
import Ticket from "./domainObjects/Ticket";

function App() {
  return (
    <div className="App">
      <ViewTicket ticket={new Ticket({id: 1, title: '', description: ''})}/>
    </div>
  );
}

export default App;
