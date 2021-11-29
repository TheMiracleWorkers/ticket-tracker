import axios from "axios";


export class TransportLayerRoles {
    apiUrl = process.env.REACT_APP_REST_API;
    axiosInstance = axios.create({
        baseURL: this.apiUrl,
    });

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
    


    