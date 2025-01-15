import  APIClient from "../../../utils/APIClient";
import {getUser} from "../../../utils/getUser";

import {Fpf} from "../models/Fpf";

export const updateFpf = async (fpfId:string, data: {name:string, isPublic:boolean, sensorServiceIp:string, address:string}) => {
    try {
        //const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/organizations`, {
        const apiClient = new APIClient()

        const user = getUser();
        const token = user?.access_token;

        const headers =
            {'Authorization': `Bearer ${token}`}
        const url = `${process.env.REACT_APP_BACKEND_URL}/api/fpfs/${fpfId}`;
        const response:Fpf = await apiClient.put(url, data, headers);

        return response
    }
    catch (error) {
        console.error("Error: " + error);
    }
};