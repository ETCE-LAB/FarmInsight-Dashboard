import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import internal from "node:stream";


interface userProfile{
    id : number,
    name : string,
    email : string,
    systemRole : string
}

const initialState : userProfile = {
    id: 0,
    name:"",
    email:"",
    //Initial Role should be Guest correct? Or "" or "none" , etc.
    systemRole: "Guest"
}

const userProfileSlice = createSlice(
    {
        name:"userProfile",
        initialState,
        reducers:{
            receive(state, action: PayloadAction<userProfile>){
                const {id, name, email, systemRole} = action.payload;
                state.id = id
                state.name = name
                state.email = email
                state.systemRole = systemRole
            }
        }

    }
)

//Used to set the received UserProfile from the Backend
export const { receive } = userProfileSlice.actions;

//Export Reducer to add him to the Store
export default userProfileSlice.reducer;


