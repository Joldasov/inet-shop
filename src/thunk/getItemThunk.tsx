import { createAsyncThunk } from "@reduxjs/toolkit";
import { $api } from "../services/service";
interface IText {
  id: string;
}
export const fetchGetItem = createAsyncThunk(
  "Get/get",
  async ({ id }: IText, thunkAPI) => {
    try {
      const { data } = await $api.get(`/goods/item/${id}`);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error as Error);
    }
  }
);
