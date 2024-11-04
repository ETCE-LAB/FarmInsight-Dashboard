import {configureStore} from "@reduxjs/toolkit";
import authReducer from "./features/auth/state/authSlice"
import UserProfileSlice from "./features/userProfile/state/UserProfileState";
import OrganizationSlice from "./features/organization/state/OrganizationSlice";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        userProfile : UserProfileSlice,
        organization :OrganizationSlice
    }
})

export type RootState = ReturnType<typeof   store.getState>

export type AppDispatch = typeof store.dispatch;


export default store;