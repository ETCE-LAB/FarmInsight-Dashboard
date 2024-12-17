import APIClient from "../../../utils/APIClient";
import {getUser} from "../../../utils/getUser";
import {Measurement} from "../../measurements/models/measurement";
import {BACKEND_URL} from "../../../env-config";




export const getImages = (cameraId:string, from:string = "2024-10-10") => {
    const apiClient = new APIClient()

    const user = getUser();
    const token = user?.access_token;

    const headers =
        {'Authorization': `Bearer ${token}`}
    let url = `${BACKEND_URL}/api/cameras/${cameraId}/images?from=${from}`;

    const result:Promise<[{url:string, measuredAt:string}]> = apiClient.get(url, headers)


    return result
}