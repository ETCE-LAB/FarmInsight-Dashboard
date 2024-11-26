import {getUser} from "../../../utils/getUser";
import APIClient from "../../../utils/APIClient";
import {HardwareConfiguration} from "../models/HardwareConfiguration";

export const getAvailableHardwareConfiguration = (fpfID: string) => {
    const apiClient = new APIClient()

    const user = getUser();
    const token = user?.access_token;

    const headers =
        {'Authorization': `Bearer ${token}`}
    const url = `${process.env.REACT_APP_BACKEND_URL}/api/sensors/types/available/${fpfID}`;
    const result:  Promise<HardwareConfiguration> = apiClient.get(url, headers)

    return result
}