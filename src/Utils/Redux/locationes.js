import { createSlice } from "@reduxjs/toolkit";
const locationes=createSlice({
    name:"locationes",
    initialState:{
        isOpen:false,
        locationName:"hii",
        lat:17.3856088,
        lng:78.4863827,
        offersOn:[],
        whatOnYourMind: []
    },
    reducers:{
        addLocation: function(state,action){
           return {...state,isOpen: action.payload};
        },
        addPlaceName: function(state,action){
            return {...state,locationName: action.payload}
        }
        ,
        addLat: function(state,action){
            return {...state,lat: action.payload}
        },
        addLng: function(state,action){
            return {...state,lng: action.payload}
        },
        addWhatOnYourMind: function(state,action){
            return {...state,whatOnYourMind:action.payload}
        },
        addOffersOn: function(state,action){
            return {...state,offersOn: action.payload}
        }
    }
})
export const {addLocation,addPlaceName,addLat,addLng,addOffersOn,addWhatOnYourMind}=locationes.actions;
export default locationes.reducer;