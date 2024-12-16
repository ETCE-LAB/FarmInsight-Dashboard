import  APIClient from "../../../utils/APIClient";
import {getUser} from "../../../utils/getUser";
import {Camera, EditCamera} from "../models/camera";

export const createCamera= async (data: EditCamera) => {
        try {
            const apiClient = new APIClient()
            const user = getUser();
            const token = user?.access_token;
            const headers =
                {'Authorization': `Bearer ${token}`}
            const url = `http://${process.env.REACT_APP_BACKEND_URL}/api/cameras`;
            console.log(data)
            const response = await apiClient.post(url, data, headers);

            return response;
        }
        catch (error) {
            console.error("Error: " + error);
            return error
        }
    };