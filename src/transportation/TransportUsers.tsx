import axios from "axios";
import User from "../domainObjects/User";

export class TransportUsers {
  apiUrl = process.env.REACT_APP_REST_API;
  axiosInstance = axios.create({
    baseURL: this.apiUrl,
  });

  getAllUsers(onAllUsersReceive: Function) {
    if (this?.apiUrl === undefined) {
      console.log('API string undefined in environment variables ".env"');
    }
    axios
      .get(this.apiUrl + "users")
      .then((response: any) => {
        const allUsers: User[] = response.data.map((responseElement: any) => new User(responseElement));
        onAllUsersReceive(allUsers);
      })
      .catch((error: any) => {
        console.log(error);
      });
  }

  getAllUsersPromise() {
    return this.axiosInstance.request({
      method: "GET",
      url: "/users",
        headers: {
            Authorization: `JWT ${localStorage.getItem('token')}`
        }
    });
  }

  getUserByIdPromise(id: number) {
    return this.axiosInstance.request({
      method: "GET",
      url: "/users/" + id,
      headers: {
        Authorization: `JWT ${localStorage.getItem('token')}`
      }
    });
  }

  postUser(User: User) {
    return this.axiosInstance.request({
      method: "POST",
      url: "/users/",
      data: User.toJSON(),
      headers: {
        Authorization: `JWT ${localStorage.getItem('token')}`
      }
    })
  }

  updateUserPromise(User: User) {
    return this.axiosInstance.request({
      method: "PUT",
      url: "/users/" + User.id + "/",
      data: User.toJSON(),
      headers: {
        Authorization: `JWT ${localStorage.getItem('token')}`
      }
    });
  }
}
