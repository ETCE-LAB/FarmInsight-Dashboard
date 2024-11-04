import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "../../../utils/store";


//Currently: 2 States, Logged in and not logged in
interface FpfSlice {
    receivedFpfEvent: number;
}

//At beginning, the suer is not logged in
const initialState: FpfSlice = {
    receivedFpfEvent: 0
}

//Über reducer Events verschicken
//reducer wäre der "Event-Bus"

const fpfSlice = createSlice({
    name: 'fpf',
    initialState,

    reducers: {
        receivedFpf(state){
            state.receivedFpfEvent += 1
        }
    }
})

export const {receivedFpf} = fpfSlice.actions
export const receivedUserProfileEvent = (state:RootState) => state.fpf.receivedFpfEvent;
export default fpfSlice.reducer




