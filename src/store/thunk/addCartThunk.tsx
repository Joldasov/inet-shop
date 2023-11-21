import { createAsyncThunk } from "@reduxjs/toolkit";
import { $authHost } from "../../services/Service";
import { endpoints } from "../../utils/const/Endpoints";
import { thunkNames } from "../../utils/const/ThunkNames";


interface IText {
  id: string
}
export const fetchCart = createAsyncThunk(
  thunkNames.AUTH_CART,
  async ({id}: IText, thunkAPI) => {
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
