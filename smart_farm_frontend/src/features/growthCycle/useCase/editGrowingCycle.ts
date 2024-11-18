import APIClient from "../../../utils/APIClient";
import {getUser} from "../../../utils/getUser";
import GrowingCycleList from "../ui/growingCycleList";
import {GrowingCycle} from "../models/growingCycle";

//8250f7569a3047ea8decf4cc101003da
//"2017-07-21T17:32:28Z
////"2017-07-21
export const editGrowingCycle = (growingCycleID:string) => {
    const apiClient = new APIClient()

    const user = getUser();
    const token = user?.access_token;

    const headers =
        {'Authorization': `Bearer ${token}`}

    const url = `${process.env.REACT_APP_BACKEND_URL}/api/growing-cycles/${growingCycleID}`;
    const result:  Promise<GrowingCycle> = apiClient.get(url, headers)

    return result
}