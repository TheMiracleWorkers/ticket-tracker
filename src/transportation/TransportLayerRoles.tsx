import axios from "axios";
import inMemoryJWT from "../domainObjects/inMemoryJWTManager";


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
                Authorization: `JWT ${inMemoryJWT.getToken()}`
            },
        });
    }
}
    


    