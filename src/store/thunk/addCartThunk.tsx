import { createAsyncThunk } from "@reduxjs/toolkit";
import { $authHost } from "../../services/service";
import { endpoints } from "../../utils/const/endpoints";
import { thunkNames } from "../../utils/const/thunkNames";

export const fetchCart = createAsyncThunk(
  thunkNames.AUTH_CART,
  async (id: string, thunkAPI) => {
    try {
      const data = await $authHost.post(endpoints.USER_CART, {
        id: id,
      });
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error as Error);
    }
  }
);
