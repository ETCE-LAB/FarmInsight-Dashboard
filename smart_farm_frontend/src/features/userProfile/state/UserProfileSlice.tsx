import {createSlice } from "@reduxjs/toolkit";
import {RootState} from "../../../utils/store";


//Currently: 2 States, Logged in and not logged in
interface UserProfileSlice {
    receivedUserProfileEvent: number;
}

//At beginning, the suer is not logged in
const initialState: UserProfileSlice = {
    receivedUserProfileEvent: 0
}



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




