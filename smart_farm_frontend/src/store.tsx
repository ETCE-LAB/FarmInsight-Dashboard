import {configureStore} from "@reduxjs/toolkit";
import authReducer from "./state/slices/authSlice"
import UserProfileSlice from "./features/userProfile/state/UserProfileState";
import OrganizationSlice from "./features/organization/state/OrganizationSlice";
import MeasurementState from "./features/sensor/state/SensorSlice";
import SensorState from "./features/sensor/state/SensorSlice";
import FpfSlice from "./features/fpf/state/FpfSlice";
import SensorSlice from "./features/sensor/state/SensorSlice";

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