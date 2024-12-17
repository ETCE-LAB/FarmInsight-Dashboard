import APIClient from "../../../utils/APIClient";
import {getUser} from "../../../utils/getUser";
import {EditSensor} from "../models/Sensor";

export const getSensor = async (sensorId: string): Promise<EditSensor|undefined> => {
    try {
        const apiClient = new APIClient()
        const user = getUser();
        const token = user?.access_token;
        const headers =
            {'Authorization': `Bearer ${token}`}
        const url = `${process.env.REACT_APP_BACKEND_URL}/api/sensors/${sensorId}`;
        return await apiClient.get(url, headers);
    }
    catch (error) {
        console.error("Error: " + error);
        return undefined
    }
};