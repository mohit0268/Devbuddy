/* eslint-disable no-unused-vars */
import { createSlice } from "@reduxjs/toolkit";

const requestSlice = createSlice({
    name:'Requests',
    initialState:null,
    reducers:{
        addRequests:(state,action)=> action.payload,
        removeRequests:(state,action)=> null
    }
})


export const{addRequests, removeRequests} = requestSlice.actions;

export default requestSlice.reducer;