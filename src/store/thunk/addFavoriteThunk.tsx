import { createAsyncThunk } from "@reduxjs/toolkit";
import { $authHost } from "../../services/Service";
import { endpoints } from "../../utils/const/Endpoints";
import { thunkNames } from "../../utils/const/ThunkNames";
export const fetchInFavor = createAsyncThunk(
  thunkNames.ADD_FAVORITIES,
  async (id: string, thunkAPI) => {
    try {
      const data = await $authHost.post(endpoints.USER_FAVORITIES, {
        id: id,
      });
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error as Error);
    }
  }
);
