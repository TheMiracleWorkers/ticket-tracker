import {
  makeAutoObservable,
  autorun,
  runInAction,
  reaction,
  IReactionDisposer,
} from "mobx";

export class TicketStore {
  // TODO: define user store
  // TODO: define transport layer
  ticketArray: Ticket[] = [];
  isLoading: boolean = true;

  constructor() {
    makeAutoObservable(this);
  }

  createTicket() {
    const ticket = new Ticket(this);
    this.ticketArray.push(ticket);
    return ticket;
  }

  // Clean a ticket from client memory, i.e. when cancelled before submitting.
  removeTicket(ticket: Ticket) {
    this.ticketArray.splice(this.ticketArray.indexOf(ticket), 1);
    ticket.dispose();
  }
}

export class Ticket {
  id: number = 0;
  category: string | null = null;
  project: string | null = null;
  priority: number = 0;
  dueDate: Date = new Date();
  createdDate: Date = new Date();
  description: String = "";
  ticketStore: TicketStore;
  autoSave: boolean = false;
  saveHandler: IReactionDisposer;

  constructor(ticketStore: TicketStore) {
    makeAutoObservable(this, {
      ticketStore: false,
      autoSave: false,
      saveHandler: false,
    });

    this.ticketStore = ticketStore;

    this.saveHandler = reaction(
      () => this.asJson, // Observe everything that is used in the JSON.
      (json) => {
        if (this.autoSave) {
          this.save();
        }
      }
    );
  }

  save() {
    // TODO: implement transport layer functionality in TicketStore.
    // this.store.transportLayer.saveTodo(json)
  }

  delete() {
    // TODO: implement transport layer functionality in TicketStore.
    // this.store.transportLayer.deleteTicket(this.id);
    this.ticketStore.removeTicket(this);
  }

  get asJson() {
    return {
      id: this.id,
      category: this.category,
      project: this.project,
      priority: this.priority,
      dueDate: this.dueDate,
      createdDate: this.createdDate,
      description: this.description,
    };
  }

  // Clean up the observer.
  dispose() {
    this.saveHandler();
  }
}
