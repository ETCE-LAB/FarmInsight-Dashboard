import {createSlice, PayloadAction } from "@reduxjs/toolkit";
import {GrowingCycle} from "../models/growingCycle";

interface GrowingCycleState{
    changeGrowingCycleEvent: number;
    growingCycles: GrowingCycle[];
}

const initialState: GrowingCycleState = {
    changeGrowingCycleEvent: 0,
    growingCycles: [],
}

const GrowingCycleSlice = createSlice({
    name: 'GrowingCycle',
    initialState,
    reducers: {
        changedGrowingCycle(state){
            state.changeGrowingCycleEvent += 1
        },
        setGrowingCycles(state, action: PayloadAction<GrowingCycle[]>) {
            state.growingCycles = action.payload;
        },
        addGrowingCycle(state, action: PayloadAction<GrowingCycle>) {
            state.growingCycles.push(action.payload);
        },
        updateGrowingCycle(state, action: PayloadAction<GrowingCycle>) {
            const index = state.growingCycles.findIndex(cycle => cycle.id === action.payload.id);
            if (index !== -1) {
                state.growingCycles[index] = action.payload;
            }
        },
        deleteGrowingCycle(state, action: PayloadAction<string>) {
            state.growingCycles = state.growingCycles.filter(cycle => cycle.id !== action.payload);
        },
    }
})

export const {changedGrowingCycle, setGrowingCycles, addGrowingCycle, updateGrowingCycle, deleteGrowingCycle,} = GrowingCycleSlice.actions
export default GrowingCycleSlice.reducer




