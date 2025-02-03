import APIClient from "../../../utils/APIClient";
import {getUser} from "../../../utils/getUser";
import {HarvestEntity} from "../models/harvestEntity";
import {BACKEND_URL} from "../../../env-config";

//8250f7569a3047ea8decf4cc101003da
//"2017-07-21T17:32:28Z
////"2017-07-21
export const deleteHarvestEntity = async (harvestEntityID:string) => {
    const apiClient = new APIClient()

    const user = getUser();
    const token = user?.access_token;

    const headers = {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json', // Ensure proper content type for JSON payload
    };

    const url = `${BACKEND_URL}/api/harvests/${harvestEntityID}`;
    try {
        const response = await apiClient.delete(url, headers);
        if(response)
            return response.status >= 200 && response.status < 300;
        else
            return false
    } catch (error) {
        console.error('Error deleting growing cycle:', error);
        return false;
    }
}