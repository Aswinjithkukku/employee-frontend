import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import axios from "../../axios";

const initialState = {
  isLoading: false,
  user: {},
  token: localStorage.getItem("user-string") || "",
  isLoggedIn: false,
};

const fetchUser = createAsyncThunk(
  "userSlice/fetchUser",
  async (_, { getState }) => {
    const { token } = getState().users;
    if (token) {
      const response = await axios.get("/users/my-account", {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } else {
      throw Error("");
    }
  }
);

const logoutUser = createAsyncThunk(
  "userSlice/logoutUser",
  async (dispatch, getState) => {
    localStorage.removeItem("user-string");
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload?.user;
      state.token = action.payload?.token;
      state.isLoggedIn = true;

      localStorage.setItem("user-string", action.payload?.token);
      state.isLoading = false;
    },
  },
  extraReducers: {
    [fetchUser.fulfilled]: (state, action) => {
      state.user = action.payload;
      state.isLoggedIn = true;
      state.isLoading = false;
    },
    [logoutUser.fulfilled]: (state, action) => {
      state.isLoggedIn = false;
      state.user = {};
      state.token = "";

      localStorage.removeItem("user-string");
      state.isLoading = false;
    },
  },
});

export { fetchUser, logoutUser };

export const { setUser } = userSlice.actions;

export default userSlice.reducer;
