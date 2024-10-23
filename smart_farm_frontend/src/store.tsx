import {configureStore} from "@reduxjs/toolkit";
import authReducer from "./state/slices/authSlice"
import userProfileSlice from "./state/slices/userProfileSlice";
import OrganizationSlice from "./features/organization/state/OrganizationSlice";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        userProfile : userProfileSlice,
        organization :OrganizationSlice
    }
})

export type RootState = ReturnType<typeof   store.getState>

export type AppDispatch = typeof store.dispatch;


export default store;