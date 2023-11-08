import { createAsyncThunk } from "@reduxjs/toolkit";
import { $authHost } from "../../services/service";
import { endpoints } from "../../utils/const/endpoints";
import { thunkNames } from "../../utils/const/thunkNames";
export const fetchUserInfo = createAsyncThunk(
  thunkNames.AUTH_USERINFO,
  async (__, thunkAPI) => {
    try {
      const data = await $authHost.get(endpoints.AUTH_USERINFO, {});
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error as Error);
    }
  }
);