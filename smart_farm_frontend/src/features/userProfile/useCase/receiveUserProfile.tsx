import {getUser} from "../../../utils/getUser";
import APIClient from "../../../utils/APIClient";
import {UserProfile} from "../models/UserProfile";


export const receiveUserProfile = () => {
    const apiClient = new APIClient()

    const user = getUser();
    const token = user?.access_token;

    const headers =
        {'Authorization': `Bearer ${token}`}

    const url = `${process.env.REACT_APP_BACKEND_URL}/api/userprofiles`;
    const result:  Promise<UserProfile> = apiClient.get(url, headers)

    return result
}






