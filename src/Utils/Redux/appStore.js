import { configureStore } from "@reduxjs/toolkit";
import cardReducer from "./cardSlice";
import locationes from "./locationes";
import userSlice from "./userSlice";
const appStore = configureStore({
  reducer: {
    cart: cardReducer,
    loc: locationes,
    user: userSlice,
  },
});
export default appStore;
