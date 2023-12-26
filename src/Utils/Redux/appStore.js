import { configureStore } from "@reduxjs/toolkit";
import cardReducer from "./cardSlice";
import locationes from "./locationes";
const appStore=configureStore({
    reducer:{
        cart: cardReducer,
        loc: locationes
    }
});
export default appStore;