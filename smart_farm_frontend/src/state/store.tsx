import {configureStore} from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice"
import userProfileSlice from "./slices/userProfileSlice";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        userProfile : userProfileSlice

    }
})

export type RootState = ReturnType<typeof   store.getState>

export type AppDispatch = typeof store.dispatch;


export default store;