import { createAsyncThunk } from "@reduxjs/toolkit";
import { $authHost } from "../../services/Service";
import { endpoints } from "../../utils/const/Endpoints";
import { thunkNames } from "../../utils/const/ThunkNames";
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
