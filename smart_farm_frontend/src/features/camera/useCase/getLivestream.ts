import APIClient from "../../../utils/APIClient";
import {getUser} from "../../../utils/getUser";


export const getLivestream = async (cameraId: string, from:string="2024-10-10") => {
    const apiClient = new APIClient()

    const user = getUser();
    const token = user?.access_token;

    const headers =
        {'Authorization': `Bearer ${token}`}
    let url = `${process.env.REACT_APP_BACKEND_URL}/api/cameras/${cameraId}/livestream`;

//cameras/${amera_id}/livestream


    return apiClient.get(url, headers)
};