import {getUser} from "../../../utils/getUser";
import APIClient from "../../../utils/APIClient";
import {Fpf} from "../models/Fpf";


export const getFpf = (fpfID: string) => {
    const apiClient = new APIClient()

    const user = getUser();
    const token = user?.access_token;

    const headers =
        {'Authorization': `Bearer ${token}`}


    const url = `http://${process.env.REACT_APP_BACKEND_URL}/api/fpfs/${fpfID}`;
    const result:  Promise<Fpf> = apiClient.get(url, headers)

    return result
}