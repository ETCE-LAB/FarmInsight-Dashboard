import APIClient from "../../../utils/APIClient";
import {getUser} from "../../../utils/getUser";
import {Measurement} from "../models/measurement";




export const getAllImages = (cameraId:string) => {
    const apiClient = new APIClient()

    const user = getUser();
    const token = user?.access_token;

    const headers =
        {'Authorization': `Bearer ${token}`}
    let url = `${process.env.REACT_APP_BACKEND_URL}/api/cameras/${cameraId}/images?from=2024-10-10`;




    const result:Promise<[{url:string, measuredAt:string}]> = apiClient.get(url, headers)
    console.log(result)
    return result
}