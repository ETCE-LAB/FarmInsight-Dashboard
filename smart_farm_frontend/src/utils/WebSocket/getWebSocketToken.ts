import APIClient from "../../utils/APIClient";
import {getUser} from "../getUser";


export const getWebSocketToken = () => {
    const apiClient = new APIClient()

    const user = getUser();
    const token = user?.access_token;

    const headers =
        {'Authorization': `Bearer ${token}`}

    const url = `http://${process.env.REACT_APP_BACKEND_URL}/api/websocket-token`;

    const result= apiClient.get(url, headers)

    return result
}