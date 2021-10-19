import "./App.css";
import Button from "@mui/material/Button";

import TransportLayerTest from "./components/TransportLayerTest";
import AddTicketForm from "./components/AddTicketForm";
import ViewTicket from "./components/viewTicket/ViewTicket";
import Ticket from "./domainObjects/Ticket";
import { DoNotDisturbAltTwoTone } from "@mui/icons-material";

function App() {
  return (
    <div className="App">
      <ViewTicket ticketId={5}/>
    </div>
  );
}

export default App;
