import  APIClient from "../../../utils/APIClient";
import {getUser} from "../../../utils/getUser";

import {Fpf} from "../models/Fpf";

export const createFpf = async (data: { name:string, isPublic:boolean, sensorServiceIp:string, cameraServiceIp:string, address:string, organizationId:string }) => {
    try {
        //const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/organizations`, {
        const apiClient = new APIClient()

        const user = getUser();
        const token = user?.access_token;

        const headers =
            {'Authorization': `Bearer ${token}`}
        const url = `${process.env.REACT_APP_BACKEND_URL}/api/fpfs`;
        const response:Fpf = await apiClient.post(url, data, headers);

        return response
    }
    catch (error) {
        console.error("Error: " + error);
    }
};