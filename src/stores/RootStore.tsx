import {TicketStore} from "./TicketStore";
import {UserStore} from "./UserStore";

export class RootStore {
    userStore: UserStore;
    ticketStore: TicketStore;

    constructor() {
        this.userStore = new UserStore(this);
        this.ticketStore = new TicketStore(this.userStore, this);
    }
}

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
