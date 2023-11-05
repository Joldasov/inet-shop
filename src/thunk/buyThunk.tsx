import { createAsyncThunk } from "@reduxjs/toolkit";
import { $authHost } from "../services/service";
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
  "fetch/Buy",
  async (
    { name, address, items, phone, timeToDeliver, comment }: IBuy,
    thunkAPI
  ) => {
    try {
      const data = await $authHost.post("/users/order", {
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
