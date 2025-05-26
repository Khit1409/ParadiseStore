import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { LoginResponse, UserType, initialState } from "./globalState/authState";

//login
export const fetchLogin = createAsyncThunk<
  LoginResponse,
  { signInput: string; password: string },
  { rejectValue: string }
>("auth/login", async ({ signInput, password }, thunkAPI) => {
  try {
    const response = await axios.post(
      `http://localhost:8080/api/auth/login`,
      {
        signInput,
        password,
      },
      { withCredentials: true }
    );
    if (response.data.resultCode == 1) {
      return response.data;
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return thunkAPI.rejectWithValue("Cant not post login");
    }
    return thunkAPI.rejectWithValue("Server error");
  }
});

//check auth
export const checkAuth = createAsyncThunk<
  UserType,
  void,
  { rejectValue: string }
>("auth/check", async (_, thunkAPI) => {
  try {
    const response = await axios.get(`http://localhost:8080/api/auth/check`, {
      withCredentials: true,
    });
    if (response.data.resultCode == 1) {
      return response.data.users;
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return thunkAPI.rejectWithValue("Axios error");
    }
    return thunkAPI.rejectWithValue("Server error");
  }
});
//logout
export const fetchLogout = createAsyncThunk<
  string,
  void,
  { rejectValue: string }
>("auth/logout", async (_, thunkAPI) => {
  try {
    const res = await axios.post(
      "http://localhost:8080/api/auth/logout",
      {},
      { withCredentials: true }
    );
    if (res.data.resultCode == 1) {
      return res.data.message;
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return thunkAPI.rejectWithValue("Lỗi post");
    }
    return thunkAPI.rejectWithValue("Lỗi server");
  }
});
//slice
const authSlice = createSlice({
  name: "auht",
  initialState,
  reducers: {},
  extraReducers: (builder) =>
    builder
      // login
      .addCase(fetchLogin.pending, (state) => {
        state.error = null;
        state.loading = true;
      })
      .addCase(fetchLogin.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(fetchLogin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // check auth
      .addCase(checkAuth.pending, (state) => {
        state.loading = true;
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.loading = false;
        state.isLoggedIn = true;
        state.users = action.payload;
      })
      .addCase(checkAuth.rejected, (state, action) => {
        state.error = action.payload as string;
        state.loading = false;
        state.isLoggedIn = false;
      })
      //logout
      .addCase(fetchLogout.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchLogout.fulfilled, (state) => {
        state.isLoggedIn = false;
        state.loading = false;
      })
      .addCase(fetchLogout.rejected, (state) => {
        state.error = "Lỗi đăng xuất";
        state.loading = false;
      }),
});

export default authSlice.reducer;
