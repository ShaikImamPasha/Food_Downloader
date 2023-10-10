import { createSlice } from "@reduxjs/toolkit";
const cardSlice=createSlice({
    name:"card",
    initialState:{
        itemes: [],
        topOrginalItem:[]
    },
    reducers:{
        addItem: function(state,action){
           state.itemes.push(action.payload);
        },
        Ti: function(state,action){
            return {...state,topOrginalItem: action.payload}
        }
        ,
        TiModifyF: function(state,action){
            const d=action.payload;
            return {...state,topOrginalItem: d.length}
        }
    }
})
export const {addItem,Ti,TiModifyF}=cardSlice.actions;
export default cardSlice.reducer;