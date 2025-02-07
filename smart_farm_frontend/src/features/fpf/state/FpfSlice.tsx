import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "../../../utils/store";
import {Fpf} from "../models/Fpf";
import {GrowingCycle} from "../../growthCycle/models/growingCycle";


//Currently: 2 States, Logged in and not logged in
interface FpfSlice {
    createdFpfEvent: number;
    fpf: Fpf;
}

//At beginning, the suer is not logged in
const initialState: FpfSlice = {
    createdFpfEvent: 0,
    fpf: {
        id: "0",
        name: "",
        isPublic: true,
        Sensors: [],
        Cameras: [],
        sensorServiceIp: "",
        address: "",
        GrowingCycles: []
    }
}

//Über reducer Events verschicken
//reducer wäre der "Event-Bus"

const fpfSlice = createSlice({
    name: 'fpf',
    initialState,

    reducers: {
        createdFpf(state){
            state.createdFpfEvent += 1
        },
        updatedFpf(state, action: PayloadAction<Fpf>) {
            state.fpf = action.payload;
        }
    }
})

export const {createdFpf, updatedFpf} = fpfSlice.actions
export const receivedUserProfileEvent = (state:RootState) => state.fpf.createdFpfEvent;
export default fpfSlice.reducer