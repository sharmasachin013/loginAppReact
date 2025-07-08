import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getAuthClient } from "./authClient";

const auth = getAuthClient();

export const login = createAsyncThunk(
  "auth/login",
  async ({ username, password }, thunkAPI) => {
    try {
      const token = await auth.login(username, password);
      return token;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: null,
    username: "",
    loggedIn: false,
    loading: false,
    error: null,
  },

  reducers: {
    logout: (state) => {
      auth.logout();
      state.token = null;
      state.username = "";
      state.loggedIn = false;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload;
        state.loggedIn = true;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
