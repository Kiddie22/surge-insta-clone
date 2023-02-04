import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: sessionStorage.getItem('user') || null,
  token: sessionStorage.getItem('token') || null,
  posts: [],
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setLogin: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      sessionStorage.setItem('user', state.user);
      sessionStorage.setItem('token', state.token);
    },
    setLogout: (state) => {
      state.user = null;
      state.token = null;
      state.posts = null;
      sessionStorage.removeItem('user');
      sessionStorage.removeItem('token');
    },
    setStatePosts: (state, action) => {
      state.posts = action.payload.posts;
    },
    setPost: (state, action) => {
      const updatedPosts = state.posts.map((post) => {
        if (post._id === action.payload.post._id) {
          return action.payload.post;
        } else {
          return post;
        }
      });
      state.posts = updatedPosts;
    },
  },
});

export const { setLogin, setLogout, setStatePosts, setPost } =
  authSlice.actions;
export default authSlice.reducer;
