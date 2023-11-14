import { createAsyncThunk } from "@reduxjs/toolkit";
import { $api } from "../../services/Service";
import { thunkNames } from "../../utils/const/ThunkNames";
interface IText {
  category: string;
  id: string;
}

export const fetchGetSubItems = createAsyncThunk(
  thunkNames.GET_SUBCATEGORY,
  async ({ category, id }: IText, thunkAPI) => {
    try {
      const data = await $api.get(
        `http://localhost:3004/goods/category/${category}/${id}?start=startPosition&count=20&sortBy=itemField&reverse=boolean`
      );
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error as Error);
    }
  }
);
