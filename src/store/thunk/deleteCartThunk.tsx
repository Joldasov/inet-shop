import { createAsyncThunk } from "@reduxjs/toolkit";
import { $authHost } from "../../services/Service";
import { thunkNames } from "../../utils/const/ThunkNames";
export const fetchCartDelete = createAsyncThunk(
  thunkNames.USER_DELETE,
  async (id: string, thunkAPI) => {
    try {
      const data = await $authHost.post(`/users/cart?id=${id}`, {
        id: id,
      });
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error as Error);
    }
  }
);
