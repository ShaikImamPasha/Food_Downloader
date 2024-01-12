import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    LoginModel: false,
    userData: null,
  },
  reducers: {
    addLoginMode: function (state, action) {
      return { ...state, LoginModel: !state.LoginModel };
    },
    addUserData: function (state, action) {
      return { ...state, userData: action.payload };
    },
  },
});
export default userSlice.reducer;
export const { addLoginMode, addUserData } = userSlice.actions;
