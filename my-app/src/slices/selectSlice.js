import { createSlice } from "@reduxjs/toolkit";

const initialSelectedPostState = {
  title: null,
  description: null,
  postId: null,
  image: null,
  username: null,
};

const postSlice = createSlice({
  name: "auth",
  initialState: initialSelectedPostState,
  reducers: {
    selectPost(currentState, action) {
      currentState.title = action.payload.title;
      currentState.description = action.payload.description;
      currentState.postId = action.payload.id;
      currentState.image = action.payload.image;
      currentState.username = action.payload.username;
    },
  },
});

export const { selectPost } = postSlice.actions;

export default postSlice.reducer;
