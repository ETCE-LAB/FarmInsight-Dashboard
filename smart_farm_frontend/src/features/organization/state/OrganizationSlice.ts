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

//Über reducer Events verschicken
//reducer wäre der "Event-Bus"

const organizationSlice = createSlice({
    name: 'organization',
    initialState,
    //There are 2 Actions: Login and Logout
    //TODO: Trigger switch to Login Page, get Token, send token to backen
    reducers: {
        createdOrganization(state){
            state.createdOrganizationEvent += 1
        }
    }
})

export const {createdOrganization} = organizationSlice.actions
export const selectCreatedOrganizationEvent = (state:RootState) => state.organization.createdOrganizationEvent;
export default organizationSlice.reducer




