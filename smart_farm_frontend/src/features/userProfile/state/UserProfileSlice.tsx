import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "../../../utils/store";


//Currently: 2 States, Logged in and not logged in
interface UserProfileSlice {
    receivedUserProfileEvent: number;
    changedUserProfileEvent: number;
}


//At beginning, the suer is not logged in
const initialState: UserProfileSlice = {
    receivedUserProfileEvent: 0,
    changedUserProfileEvent: 0
}



const userProfileSlice = createSlice({
    name: 'userProfile',
    initialState,

    reducers: {
        receivedUserProfile(state){
            state.receivedUserProfileEvent += 1
        },
        changedUserProfile(state) {
            state.changedUserProfileEvent += 1
        }
    }
})

export const {receivedUserProfile, changedUserProfile} = userProfileSlice.actions
export const changedUserProfileEvent = (state:RootState) => state.userProfile.changedUserProfileEvent;
export const receivedUserProfileEvent = (state:RootState) => state.userProfile.receivedUserProfileEvent;
export default userProfileSlice.reducer
