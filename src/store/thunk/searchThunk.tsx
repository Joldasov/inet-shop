import { createAsyncThunk } from "@reduxjs/toolkit";
import { $authHost } from "../../services/service";
import { thunkNames } from "../../utils/const/thunkNames";

interface IText {
  text: string;
}

export const fetchSearch = createAsyncThunk(
  thunkNames.USER_SEARCH,
  async ({ text }: IText, thunkAPI) => {
    try {
      const { data } = await $authHost.get(`/goods/search?text=${text}`);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error as Error);
    }
  }
);
