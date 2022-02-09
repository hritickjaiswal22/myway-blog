import { createSlice } from "@reduxjs/toolkit";

const initialAuthState = {
  userId: null,
  username: null,
  token: null,
  val: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialAuthState,
  reducers: {
    saveUser(currentState, action) {
      currentState.val = action.payload.val;
      currentState.username = action.payload.username;
      currentState.userId = action.payload.userId;
      currentState.token = action.payload.token;
    },
  },
});

export const { saveUser } = authSlice.actions;

export default authSlice.reducer;
