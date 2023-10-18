import { createSlice } from "@reduxjs/toolkit";
const headerSlice=createSlice({
    name:"card",
    initialState:{
        itemes: [],
        topOrginalItem:[]
    },
    reducers:{
        addItem: function(state,action){
           state.itemes.push(action.payload);
        }
    }
})
export const {addItem,Ti,TiModifyF}=headerSlice.actions;
export default headerSlice.reducer;