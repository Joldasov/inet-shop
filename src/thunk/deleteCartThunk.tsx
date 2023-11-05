import { createAsyncThunk } from "@reduxjs/toolkit";
import { $authHost } from "../services/service";
export const fetchCartDelete = createAsyncThunk(
  "Auth/delete",
  async (id, thunkAPI) => {
    try {
      const data = await $authHost.post(`/users/cart?id=${id}`, {
        id: id,
      });
      console.log(id);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error as Error);
    }
  }
);
