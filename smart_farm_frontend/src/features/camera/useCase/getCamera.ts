import {EditSensor} from "../../sensor/models/Sensor";
import APIClient from "../../../utils/APIClient";
import {getUser} from "../../../utils/getUser";
import {EditCamera} from "../models/camera";


export const getCamera = async (cameraId: string): Promise<EditCamera|undefined> => {
    try {
        const apiClient = new APIClient()
        const user = getUser();
        const token = user?.access_token;
        const headers =
            {'Authorization': `Bearer ${token}`}
        const url = `${process.env.REACT_APP_BACKEND_URL}/api/cameras/${cameraId}`;
        return await apiClient.get(url, headers);
    }
    catch (error) {
        console.error("Error: " + error);
        return undefined
    }
};