import {getUser} from "../../../utils/getUser";
import APIClient from "../../../utils/APIClient";
import {Sensor} from "../models/Sensor";


export const receiveSensor = (sensorID:number) => {
    const apiClient = new APIClient()

    const user = getUser();
    const token = user?.access_token;

    const headers =
        {'Authorization': `Bearer ${token}`}

    const url = `${process.env.REACT_APP_BACKEND_URL}/api/sensors/${sensorID}`;
    const result:  Promise<Sensor> = apiClient.get(url, headers)

    return result
}


