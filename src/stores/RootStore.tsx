import { TicketStore } from "./TicketStore";
import { UserStore } from "./UserStore";

export class RootStore {
  userStore: UserStore;
  ticketStore: TicketStore;

  constructor() {
    this.userStore = new UserStore(this);
    this.ticketStore = new TicketStore(this.userStore, this);
  }
}
