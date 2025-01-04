import {createSlice} from "@reduxjs/toolkit";
import {RootState} from "../../../utils/store";

interface HarvestEntityState{
    changeHarvestEntityEvent: number;
}

const initialState: HarvestEntityState = {
    changeHarvestEntityEvent: 0
}

const HarvestEntitySlice = createSlice({
    name: 'HarvestEntity',
    initialState,

    reducers: {
        changedHarvestEntity(state){
            state.changeHarvestEntityEvent += 1
        }
    }
})

export const {changedHarvestEntity} = HarvestEntitySlice.actions
export const changeHarvestEntityEvent = (state:RootState) => state.harvestEntity.changeHarvestEntityEvent;
export default HarvestEntitySlice.reducer




