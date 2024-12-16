import APIClient from "../../../utils/APIClient";
import {getUser} from "../../../utils/getUser";

export const kickMember = async (data: { id:string }) => {
    try {

        const apiClient = new APIClient()

        const user = getUser();
        const token = user?.access_token;

        const headers =
            {'Authorization': `Bearer ${token}`}
        const url = `http://${process.env.REACT_APP_BACKEND_URL}/api/memberships/${data.id}`;
        return await apiClient.delete(url, headers)
    }
    catch (error) {
        console.error("Error: " + error);
    }
};