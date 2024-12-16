import APIClient from "../../../utils/APIClient";
import {getUser} from "../../../utils/getUser";


export const promoteMember = async (data: { id:string, membershipRole:string }) => {
    try {
        const apiClient = new APIClient()

        const user = getUser();
        const token = user?.access_token;

        const headers =
            {'Authorization': `Bearer ${token}`}
        const url = `http://${process.env.REACT_APP_BACKEND_URL}/api/memberships/${data.id}`;


        const response = await apiClient.put(url, data, headers)

        console.log(response)

        return

    }
    catch (error) {
        console.error("Error: " + error);
    }
};