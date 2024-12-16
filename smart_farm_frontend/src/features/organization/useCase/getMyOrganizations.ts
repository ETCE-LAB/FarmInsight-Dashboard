import APIClient from "../../../utils/APIClient";
import {getUser} from "../../../utils/getUser";
import {Organization} from "../models/Organization";


export const getMyOrganizations = () => {
    const apiClient = new APIClient()

    const user = getUser();
    const token = user?.access_token;

    const headers =
        {'Authorization': `Bearer ${token}`}


    const url = `http://${process.env.REACT_APP_BACKEND_URL}/api/organizations/own`;
    const result:  Promise<Organization[]> = apiClient.get(url, headers)

    return result
}
