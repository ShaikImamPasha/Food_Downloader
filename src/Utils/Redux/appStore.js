import { configureStore } from "@reduxjs/toolkit";
import cardReducer from "./cardSlice";
import locationes from "./locationes";
const appStore=configureStore({
    reducer:{
        cart: cardReducer,
        loc: locationes,
        Commente:Commentes
    }
});
export default appStore;