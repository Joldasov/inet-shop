import { createAsyncThunk } from "@reduxjs/toolkit";
import { $authHost } from "../../services/Service";
import { thunkNames } from "../../utils/const/ThunkNames";
interface IText {
  id: string;
  details: {
    name: string;
    address: string;
    phone: string;
    timeToDeliver: string;
    comment: string;
  };
}
export const fetchOrderChange = createAsyncThunk(
  thunkNames.CHANGE_ORDER,
  async (
    { id, details: { name, address, phone, timeToDeliver, comment } }: IText,
    thunkAPI
  ) => {
    try {
      const data = await $authHost.put(`/users/order`, {
        id: id,
        details: {
          name: name,
          address: address,
          phone: phone,
          timeToDeliver: timeToDeliver,
          comment: comment,
        },
      });
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error as Error);
    }
  }
);
