import { createSlice } from "@reduxjs/toolkit";
const cardSlice=createSlice({
    name:"card",
    initialState:{
        itemes: [],
        topOrginalItem:[],
        resturentData:[]
    },
    reducers:{
        addItem: function(state,action){
           return {...state,itemes: action.payload}
        },
        increamentItem: function(state,action){
            return {...state,itemes: action.payload}
    },
        Ti: function(state,action){
            return {...state,topOrginalItem: action.payload}
        }
        ,
        TiModifyF: function(state,action){
            const d=action.payload;
            return {...state,topOrginalItem: d.length}
        },
        addResturentData:function(state,action){
            return {...state,resturentData:action.payload}
        }
    }
})
export const {addItem,Ti,TiModifyF, addResturentData,increamentItem}=cardSlice.actions;
export default cardSlice.reducer;