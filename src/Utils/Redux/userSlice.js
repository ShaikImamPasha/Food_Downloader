import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    LoginModel: false,
    userData: null,
    CommentModel: false,
  },
  reducers: {
    addLoginMode: function (state, action) {
      return { ...state, LoginModel: !state.LoginModel };
    },
    addUserData: function (state, action) {
      return { ...state, userData: action.payload };
    },
    addCommentModel: function (state, action) {
      return { ...state, CommentModel: !state.CommentModel };
    },
  },
});
export default userSlice.reducer;
export const { addLoginMode, addUserData, addCommentModel } = userSlice.actions;
