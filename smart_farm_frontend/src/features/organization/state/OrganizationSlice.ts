import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "../../../utils/store";


//Currently: 2 States, Logged in and not logged in
interface OrganizationState{
    createdOrganizationEvent: number;
}

//At beginning, the suer is not logged in
const initialState: OrganizationState = {
    createdOrganizationEvent: 0
}

const organizationSlice = createSlice({
    name: 'organization',
    initialState,

    reducers: {
        createdOrganization(state){
            state.createdOrganizationEvent += 1
        }
    }
})

export const {createdOrganization} = organizationSlice.actions
export const createdOrganizationEvent = (state:RootState) => state.organization.createdOrganizationEvent;
export default organizationSlice.reducer




