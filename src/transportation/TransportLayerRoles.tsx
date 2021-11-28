import axios from "axios";
import Role from "../domainObjects/Role";


export class TransportLayerRoles {
    apiUrl = process.env.REACT_APP_REST_API;
    axiosInstance = axios.create({
        baseURL: this.apiUrl,
    });

    getAllRoles(onAllTicketsReceive: Function) {
        if (this?.apiUrl === undefined) {
            console.log('API string undefined in environment variables ".env"');
        }
        axios
            .get(this.apiUrl + "roles")
            .then((response: any) => {
                const allRoles: Role[] = response.data.map((responseElement: any) => new Role(responseElement));
                onAllTicketsReceive(allRoles);
            })
            .catch((error: any) => {
                console.log(error);
            });
    }

    getAllRolesPromise() {
        return this.axiosInstance.request({
            method: "GET",
            url: "/roles",
            headers: {
                Authorization: `JWT ${localStorage.getItem('token')}`
            }
        });
    }
}
    


    