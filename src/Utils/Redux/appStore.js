import { configureStore } from "@reduxjs/toolkit";
import cardReducer from "./cardSlice";
import locationes from "./locationes";
import userSlice from "./userSlice";
import headerSlice from "./headerSlice";
const appStore = configureStore({
  reducer: {
    cart: cardReducer,
    loc: locationes,
    user: userSlice,
    header: headerSlice,
  },
});
export default appStore;
