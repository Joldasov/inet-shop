import { createAsyncThunk } from "@reduxjs/toolkit";
import { $authHost } from "../../services/Service";
import { thunkNames } from "../../utils/const/ThunkNames";
interface IText {
  id: string | undefined;
}
export const fetchOrderDelete = createAsyncThunk(
  thunkNames.DELETE_ORDER,
  async ({id}: IText, thunkAPI) => {
    try {
      const data = await $authHost.delete(`/users/order?id=${id}`);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error as Error);
    }
  }
);
