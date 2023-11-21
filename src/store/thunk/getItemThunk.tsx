import { createAsyncThunk } from "@reduxjs/toolkit";
import { $api } from "../../services/Service";
import { thunkNames } from "../../utils/const/ThunkNames";
interface IText {
  id: string ;
}
export const fetchGetItem = createAsyncThunk(
  thunkNames.USER_GETITEMS,
  async ({ id }: IText, thunkAPI) => {
    try {
      const { data } = await $api.get(`/goods/item/${id}`);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error as Error);
    }
  }
);
