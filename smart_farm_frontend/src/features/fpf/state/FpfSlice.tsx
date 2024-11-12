import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "../../../utils/store";


//Currently: 2 States, Logged in and not logged in
interface FpfSlice {
    createdFpfEvent: number;
}

//At beginning, the suer is not logged in
const initialState: FpfSlice = {
    createdFpfEvent: 0
}

//Über reducer Events verschicken
//reducer wäre der "Event-Bus"

const fpfSlice = createSlice({
    name: 'fpf',
    initialState,

    reducers: {
        createdFpf(state){
            state.createdFpfEvent += 1
        }
    }
})

export const {createdFpf} = fpfSlice.actions
export const receivedUserProfileEvent = (state:RootState) => state.fpf.createdFpfEvent;
export default fpfSlice.reducer