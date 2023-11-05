import {  createSlice } from "@reduxjs/toolkit";
import { fetchBuy } from "../../thunk/buyThunk";



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
