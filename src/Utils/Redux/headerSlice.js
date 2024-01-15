import { createSlice } from "@reduxjs/toolkit";
import { enableMapSet } from "immer";

enableMapSet(); // Enable Map and Set support in Immer

const headerSlice = createSlice({
  name: "card",
  initialState: {
    itemes: [],
    topOrginalItem: [],
    catchData: new Map(),
    lruCatch: [],
    newDataLoader: false,
  },
  reducers: {
    addItem: function (state, action) {
      state.itemes.push(action.payload);
    },
    addCatchData: function (state, action) {
      state.catchData.set(action.payload.placeSearch, action.payload.data);
    },
    addNewDataLoader: function (state, action) {
      return { ...state, newDataLoader: action.payload };
    },
  },
});

export const { addItem, Ti, TiModifyF, addCatchData, addNewDataLoader } =
  headerSlice.actions;
export default headerSlice.reducer;
