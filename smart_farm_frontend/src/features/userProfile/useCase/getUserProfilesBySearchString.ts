import APIClient from "../../../utils/APIClient";
import {getUser} from "../../../utils/getUser";
import {UserProfile} from "../models/UserProfile";


export const getUserProfilesBySearchString = (searchString:string) => {
    const apiClient = new APIClient()

    const user = getUser();
    const token = user?.access_token;

    const headers =
        {'Authorization': `Bearer ${token}`}

    const url = `${process.env.REACT_APP_BACKEND_URL}/api/userprofiles/${searchString}`;
    const result:  Promise<UserProfile[]> = apiClient.get(url, headers)

    return result
}
