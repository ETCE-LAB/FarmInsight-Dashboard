import {createSlice, PayloadAction} from "@reduxjs/toolkit";


//Currently: 2 States, Logged in and not logged in
interface AuthState{
    isLoggedIn: boolean;
}

//At beginning, the suer is not logged in
const initialState: AuthState = {
    isLoggedIn: false
}


const authSlice = createSlice({
    name: 'auth',
    initialState,
    //There are 2 Actions: Login and Logout
    //TODO: Trigger switch to Login Page, get Token, send token to backen
    reducers: {
        login(state){
            state.isLoggedIn = true
        },
        //TODO: Remove TOken (?), logout and remove userProfile
        logout(state){
            state.isLoggedIn=false
        }
    }
})

export const {login, logout} = authSlice.actions

export default authSlice.reducer




