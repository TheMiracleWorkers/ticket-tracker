import {
  makeAutoObservable,
  autorun,
  runInAction,
  reaction,
  IReactionDisposer,
} from "mobx";
import { RootStore } from "./RootStore";

export class UserStore {
  // TODO: define transport layer
  rootStore: RootStore; // Use this to get a reference to other stores, like UserStore.
  userArray: User[] = [];
  isLoading: boolean = true;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    makeAutoObservable(this);
  }

  createUser() {
    const user = new User(this);
    this.userArray.push(user);
    return user;
  }

  resolveUser(id: number) {
    // WARNING: made non-nullable otherwise typescript complains about not being to asign undefined to null. Not sure if this is the right way to go.
    let user: User = this.userArray.find((user) => user.id === id)!;
    return user;
  }

  // Clean a user from client memory, i.e. when cancelled before submitting.
  removeUser(user: User) {
    this.userArray.splice(this.userArray.indexOf(user), 1);
    user.dispose();
  }
}

export class User {
  id: number | null = null;
  firstName: string = "";
  lastName: string = "";
  role: string = "";
  email: string = "";
  phone: number | null = null;
  userStore: UserStore;
  autoSave: boolean = false;
  saveHandler: IReactionDisposer;

  constructor(userStore: UserStore) {
    this.userStore = userStore;

    makeAutoObservable(this, {
      userStore: false,
      autoSave: false,
      saveHandler: false,
    });

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
    // TODO: implement transport layer functionality in UserStore.
    // this.store.transportLayer.saveUser(json)
  }

  delete() {
    // TODO: implement transport layer functionality in UserStore.
    // this.store.transportLayer.deleteUser(this.id);
    this.userStore.removeUser(this);
  }

  get asJson() {
    return {
      id: this.id,
      firstName: this.firstName,
      lastName: this.lastName,
      role: this.role,
      email: this.email,
      phone: this.phone,
    };
  }

  // Clean up the observer.
  dispose() {
    this.saveHandler();
  }
}
