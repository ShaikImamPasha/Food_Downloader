import { createSlice } from "@reduxjs/toolkit";
const locationes=createSlice({
    name:"locationes",
    initialState:{
        isOpen:null,
        locationName:"hyderabad",
        lat:17.3856088,
        lng:78.4863827,
        offersOn:[],
        whatOnYourMind: [],
        mapData: "now",
        topOfferesForYou: [],
        searchlocatines:[]
    },
    reducers:{
        addSearchLocatines: function(state,action){
          return {...state,searchlocatines:action.payload}  
        },
        TopOfferesForYou: function(state,action){
            return {...state,topOfferesForYou: action.payload};
         },
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
        },
        addMapResturenData: function(state,action){
            return {mapData:action.payload}
        }
    }
})
export const {addSearchLocatines,addLocation,addPlaceName,addLat,addLng,addOffersOn,addWhatOnYourMind,addMapResturenData,TopOfferesForYou}=locationes.actions;
export default locationes.reducer;