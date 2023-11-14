import { createAsyncThunk } from "@reduxjs/toolkit";
import { $authHost } from "../../services/Service";
import { endpoints } from "../../utils/const/Endpoints";
import { thunkNames } from "../../utils/const/ThunkNames";
interface IBuy {
  name: string;
  address: string;
  phone: string;
  timeToDeliver: string;
  comment: string;
  items: [
    {
      id: string;
      amount: number;
    }
  ];
}
export const fetchBuy = createAsyncThunk(
  thunkNames.USER_BUY,
  async (
    { name, address, items, phone, timeToDeliver, comment }: IBuy,
    thunkAPI
  ) => {
    try {
      const data = await $authHost.post(endpoints.USER_BUY, {
        items: items,
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
