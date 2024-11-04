import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "../../../utils/store";


//Currently: 2 States, Logged in and not logged in
interface UserProfileState{
    receivedUserProfileEvent: number;
}

//At beginning, the suer is not logged in
const initialState: UserProfileState = {
    receivedUserProfileEvent: 0
}

//Über reducer Events verschicken
//reducer wäre der "Event-Bus"

const userProfileSlice = createSlice({
    name: 'userProfile',
    initialState,

    reducers: {
        receivedUserProfile(state){
            state.receivedUserProfileEvent += 1
        }
    }
})

export const {receivedUserProfile} = userProfileSlice.actions
export const receivedUserProfileEvent = (state:RootState) => state.userProfile.receivedUserProfileEvent;
export default userProfileSlice.reducer




