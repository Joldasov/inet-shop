import { createAsyncThunk } from "@reduxjs/toolkit";
import { $authHost } from "../services/service";

interface IText {
  text: string;
}

export const fetchSearch = createAsyncThunk(
  "Auth/search",
  async ({ text }: IText, thunkAPI) => {
    try {
      const { data } = await $authHost.get(`/goods/search?text=${text}`);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error as Error);
    }
  }
);