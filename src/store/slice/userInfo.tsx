import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import  {$authHost}  from "../../services/servise";
// import axios from "axios";

export const fetchUserInfo = createAsyncThunk(
  "Auth/userInfo",
  async (__, thunkAPI) => {
    try {
      const data = await $authHost.get("/users/userInfo", {});
      return data
    } catch (error) {
      return thunkAPI.rejectWithValue(error as Error);
    }
  }
);
export interface registerState {
  error: string;
  isLoading: boolean;
  true: [];
}

const initialState: registerState = {
  error: "",
  isLoading: false,
  true: [],
};

export const UserInfo = createSlice({
  name: "userInfo",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchUserInfo.pending.type]: (state) => {
      state.isLoading = true;
    },
    [fetchUserInfo.fulfilled.type]: (state, action) => {
      state.error = "";
      state.isLoading = false;
      state.true = action.payload
    },
    [fetchUserInfo.rejected.type]: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
  },
});

// Action creators are generated for each case reducer function
export const {} = UserInfo.actions;

export default UserInfo.reducer;
