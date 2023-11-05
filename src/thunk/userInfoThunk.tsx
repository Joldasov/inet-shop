import { createAsyncThunk } from "@reduxjs/toolkit";
import { $authHost } from "../services/service";
export const fetchUserInfo = createAsyncThunk(
  "Auth/userInfo",
  async (__, thunkAPI) => {
    try {
      const data = await $authHost.get("/users/userInfo", {});
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error as Error);
    }
  }
);
