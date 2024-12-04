import {createSlice} from "@reduxjs/toolkit";
import {RootState} from "../../../utils/store";

interface GrowingCycleState{
    changeGrowingCycleEvent: number;
}

const initialState: GrowingCycleState = {
    changeGrowingCycleEvent: 0
}

const GrowingCycleSlice = createSlice({
    name: 'GrowingCycle',
    initialState,

    reducers: {
        changedGrowingCycle(state){
            state.changeGrowingCycleEvent += 1
        }
    }
})

export const {changedGrowingCycle} = GrowingCycleSlice.actions
export const changeGrowingCycleEvent = (state:RootState) => state.growingCycle.changeGrowingCycleEvent;
export default GrowingCycleSlice.reducer




