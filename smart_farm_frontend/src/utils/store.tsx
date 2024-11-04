import {configureStore} from "@reduxjs/toolkit";
import authReducer from "../state/slices/authSlice"
import UserProfileSlice from "../features/userProfile/state/UserProfileSlice";
import OrganizationSlice from "../features/organization/state/OrganizationSlice";
import FpfSlice from "../features/fpf/state/FpfSlice";
import SensorSlice from "../features/sensor/state/SensorSlice";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        userProfile : UserProfileSlice,
        organization :OrganizationSlice,
        sensor: SensorSlice,
        fpf : FpfSlice
    }
})

export type RootState = ReturnType<typeof   store.getState>

export type AppDispatch = typeof store.dispatch;

export default store;