import {IReactionDisposer, makeAutoObservable, reaction,} from "mobx";
import {RootStore} from "./RootStore";
import {User, UserStore} from "./UserStore";

export class TicketStore {
    rootStore: RootStore; // Use this to get a reference to other stores, like UserStore.
    userStore: UserStore;
    // TODO: define transport layer
    ticketArray: Ticket[] = [];
    isLoading: boolean = true;

    constructor(userStore: UserStore, rootStore: RootStore) {
        this.rootStore = rootStore;
        this.userStore = userStore;
        makeAutoObservable(this);
    }

    //   // Fetches all Tickets from the server.
    //   loadTickets() {
    //     this.isLoading = true;
    //     this.transportLayer.fetchTickets().then((fetchedTickets) => {
    //       runInAction(() => {
    //         fetchedTickets.forEach((json) => this.updateTicketFromServer(json));
    //         this.isLoading = false;
    //       });
    //     });
    //   }

    //   // Update a Ticket with information from the server. Guarantees a Ticket only
    //   // exists once. Might either construct a new Ticket, update an existing one,
    //   // or remove a Ticket if it has been deleted on the server.
    //   updateTicketFromServer(json) {
    //     let ticket = this.ticketArray.find((ticket) => ticket.id === json.id);
    //     if (!ticket) {
    //       ticket = new Ticket(this, json.id);
    //       this.ticketArray.push(ticket);
    //     }
    //     if (json.isDeleted) {
    //       this.removeTicket(ticket);
    //     } else {
    //       ticket.updateFromJson(json);
    //     }
    //   }

    getTicketsBySubmittee(user: User) {
        // Access ticketStore through the root store.
        return this.rootStore.ticketStore.ticketArray.filter(
            (ticket) => ticket.submittee === user
        );
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
    id: number | null = null;
    category: string | null = null;
    project: string | null = null;
    priority: number = 0;
    dueDate: Date = new Date();
    createdDate: Date = new Date();
    description: String = "";
    submittee: User | null = null; // Who submitted the ticket. Reference to User domain object in UserStore.
    personOfContact: User | null = null; // Customer liaison. Reference to User domain object in UserStore.
    assignee: User[] | null = null; // People assigned to this ticket. Reference to User domain objects in UserStore.
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
        // this.store.transportLayer.saveTicket(json)
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

    //   // Update this Ticket with information from the server.
    //   updateFromJson(json) {
    //     this.autoSave = false; // Prevent sending of our changes back to the server.
    //     this.category = json.category;
    //     this.priority = json.priority;
    //     this.dueDate = json.dueDate;
    //     this.createdDate = json.createdDate;
    //     this.description = json.description;

    //     this.submittee = this.ticketStore.userStore.resolveUser(json.submitteeId);
    //     this.autoSave = true;
    //   }

    // Clean up the observer.
    dispose() {
        this.saveHandler();
    }
}
