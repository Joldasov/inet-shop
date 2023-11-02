import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { $authHost } from "../../services/servise";

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
  async ({ name, address, items, phone, timeToDeliver, comment }: IBuy, thunkAPI) => {
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
export interface BuyState {
  error: [];
  isLoading: boolean;
  status: [];
}

const initialState: BuyState = {
  error: [],
  isLoading: false,
  status: [],
};

export const Buy = createSlice({
  name: "buy",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchBuy.pending.type]: (state) => {
      state.isLoading = true;
    },
    [fetchBuy.fulfilled.type]: (state, action) => {
      state.isLoading = false;
      state.status = action.payload;
    },
    [fetchBuy.rejected.type]: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
  },
});

// Action creators are generated for each case reducer function
export const {} = Buy.actions;

export default Buy.reducer;
