import { createSlice } from "@reduxjs/toolkit";
const commentes=createSlice({
    name:"card",
    initialState:{
       commentesData:[]
    },
    reducers:{
        addCommentesData: function(state,action){
        state.commentesData.push(action.payload);
        }
    }
})
export const {addCommentesData}=commentes.actions;
export default commentes.reducer;