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
      state.user = null;
      sessionStorage.removeItem('user');
      sessionStorage.removeItem('token');
    },
    setPosts: (state, action) => {
      state.posts = action.payload.posts;
    },
    setPost: (state, action) => {
      const updatedPosts = state.posts.map((post) => {
        if (post._id === action.payload.post_id) {
          return action.payload.post;
        } else {
          return post;
        }
      });
      state.posts = updatedPosts;
    },
  },
});

export const { setLogin, setLogout, setPosts, setPost } = authSlice.actions;
export default authSlice.reducer;
