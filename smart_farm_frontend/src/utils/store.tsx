import {configureStore} from "@reduxjs/toolkit";
import UserProfileSlice from "../features/userProfile/state/UserProfileSlice";
import OrganizationSlice from "../features/organization/state/OrganizationSlice";
import FpfSlice from "../features/fpf/state/FpfSlice";
import SensorSlice from "../features/sensor/state/SensorSlice";
import measurementSlice from "../features/measurements/state/measurementSlice";
import authSlice from "../features/auth/slice/authSlice";

export const store = configureStore({
    reducer: {
        auth: authSlice,
        userProfile : UserProfileSlice,
        organization :OrganizationSlice,
        sensor: SensorSlice,
        fpf : FpfSlice,
        measurement: measurementSlice
    }
})

export type RootState = ReturnType<typeof   store.getState>

export type AppDispatch = typeof store.dispatch;

export default store;