import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../slices/authSlice";
import selectReducer from "../slices/selectSlice";

const store = configureStore({
  reducer: {
    authState: authReducer,
    selectPostState: selectReducer,
  },
});

export default store;
